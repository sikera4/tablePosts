import React, { useState, useEffect, useMemo } from 'react';
import { trackPromise } from 'react-promise-tracker';
import './App.scss';
import Table from './Components/Table/Table';
import UserFilter from './Components/UserFilter/UserFilter';
import SearchInput from './Components/SearchInput/SearchInput';
import { HeaderInfoInterface, PostInterface, TableBodyDataInterface, UsersDataInterface } from './Interfaces/Interfaces';


function App() {

  const [posts, setPosts] = useState<PostInterface[]>();
  const [tableHeadData, setTableHeadData] = useState<HeaderInfoInterface>();
  const [searchString, setSearchString] = useState<string>('');
  const [sortingSettings, setSortingSettings] = useState({column: '', order: ''});
  const [postIdToDelete, setPostIdToDelete] = useState<string>('');
  const [usersData, setUsersData] = useState<UsersDataInterface[]>();
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedSearchField, setSelectedSearchField] = useState('');

  const onSort = (column: string, order: string) => {
    setSortingSettings({column: column, order: order});
  }

  const onDeleteClick = (id: string) => {
    setPostIdToDelete(id);
  }

  const onUserFilterChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(parseInt(e.target.value));
  }

  const onSelectedSearchFieldChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSearchField(e.target.value);
  }

  const onSearchStringChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.status !== 200) {
      throw new Error('Could not fetch users data');
    }
    const data: UsersDataInterface[] = await response.json();
    return data;
  }

  const fetchData = async () => {
    const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.status !== 200) {
      throw new Error('Could not fetch the posts');
    }
    const data: PostInterface[] = await response.json();
    return data;
  }

  const deletePost = async (id: string) => {
    if (id !== '') {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.status !== 200) {
      throw new Error('Could not delete the post!');
    }
    alert(`Successfully deleted the post with id ${id} (or would've if it did actually work)`);
    setPostIdToDelete('');
    return response.status;
    }
  }

  useEffect(() => {
    trackPromise(
    fetchData()
    .then((data) => {
      setPosts(data);
      let headData = [];
      for (let header of Object.keys(data[0])) {
        headData.push(header);
      }
      setTableHeadData({headers: headData, onSort: onSort});
    }).catch(err => alert(err.message + ' posts')));
  }, []);

  useEffect(() => {
    deletePost(postIdToDelete).catch(err => alert(err.message));
    fetchData()
    .then((data) => {
      setPosts(data);
    }).catch(err => alert(err.message));
  },[postIdToDelete]);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsersData(data);
      }).catch(err => alert(err.message + ' users'));
  }, [])

  const neededPosts = useMemo(() => {
    let neededPosts = posts;
    if (searchString !== '') {
      switch (selectedSearchField) {
        case '':
          break;
        case 'userId':
          neededPosts = neededPosts?.filter(post => post.userId.toString() === searchString);
          break;
        case 'id':
          neededPosts = neededPosts?.filter(post => post.id.toString() === searchString);
          break;
        case 'title': 
          neededPosts = neededPosts?.filter(post => post.title.includes(searchString));
          break;
        case 'body': 
          neededPosts = neededPosts?.filter(post => post.body.includes(searchString));
          break;
      }
    }
    
    if (sortingSettings.column) {
      const reversed = sortingSettings.order === 'asc' ? 1 : -1;
      neededPosts = neededPosts?.sort(
        (a,b) => 
          reversed * (a[sortingSettings.column as keyof PostInterface].toString())
          .localeCompare(b[sortingSettings.column as keyof PostInterface].toString(), undefined, {numeric: true}));
    }
    if (selectedUserId) {
      neededPosts = neededPosts?.filter(post => post.userId === selectedUserId);
    }
    return neededPosts;
  }, [searchString, posts, sortingSettings, selectedUserId, selectedSearchField]);

  return (
    <div className="App">
      <div className="container">
        <div className="controls">
          {usersData && <h1 className="controls__header">Here's your control panel! Control those posts!</h1>}
          {usersData && <UserFilter onUserFilterChange={onUserFilterChange} usersData={usersData}/>}
          {tableHeadData && <SearchInput onSelectedSearchFieldChange={onSelectedSearchFieldChange}
          onSearchStringChange={onSearchStringChange}
          headers={tableHeadData.headers}/>}
        </div>
        {posts && <Table 
        tableBodyData={{posts: neededPosts, onDelete: onDeleteClick} as TableBodyDataInterface} 
        tableHeadData={tableHeadData!}/>}
      </div>
    </div>
  );
}

export default App;
