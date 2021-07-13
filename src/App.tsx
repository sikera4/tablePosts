import React, { useState, useEffect, useMemo } from 'react';
import './App.scss';
import Table from './Components/Table/Table';
import { HeaderInfoInterface } from './Components/Table/TableHeader/TableHeader';
import { PostInterface, TableBodyDataType } from './Components/Table/TableRow/TableRow';

function App() {

  const [tableBodyData, setTableBodyData] = useState<TableBodyDataType>();
  const [tableHeadData, setTableHeadData] = useState<object>();
  const [searchString, setSearchString] = useState<string>('');
  const [sortingSettings, setSortingSettings] = useState({column: '', order: ''});

  const onSort = (column: string, order: string) => {
    setSortingSettings({column: column, order: order});
  }

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setTableBodyData(data);
    let headData = [];
    for (let header of Object.keys(data[0])) {
      headData.push(header);
    }
    setTableHeadData({headers: headData, onSort: onSort});
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const neededPosts = useMemo(() => {
    let neededPosts = tableBodyData;
    if (searchString !== '') {
      neededPosts = tableBodyData?.filter(post => post.title.includes(searchString) || 
      post.body.includes(searchString) ||
      post.id.toString().includes(searchString) ||
      post.userId.toString().includes(searchString));
    }

    if (sortingSettings.column) {
      const reversed = sortingSettings.order === 'asc' ? 1 : -1;
      neededPosts = neededPosts?.sort(
        (a,b) => 
          reversed * (a[sortingSettings.column as keyof PostInterface].toString())
          .localeCompare(b[sortingSettings.column as keyof PostInterface].toString(), undefined, {numeric: true}));
    }
    return neededPosts;
  }, [searchString, tableBodyData, sortingSettings]);

  return (
    <div className="App">
      <input type="text"
      placeholder="search"
      className="search-input"
      onChange={(e: {target: HTMLInputElement}) => {setSearchString(e.target.value)}}/>
      <Table tableBodyData={neededPosts as TableBodyDataType} 
      tableHeadData={tableHeadData as HeaderInfoInterface}/>
    </div>
  );
}

export default App;
