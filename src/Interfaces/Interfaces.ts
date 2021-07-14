export interface UsersDataInterface {
  id: string;
  username: string;
}

export interface TableDataInterface {
  tableHeadData: HeaderInfoInterface;
  tableBodyData: TableBodyDataInterface;
}

export interface HeaderInfoInterface {
  headers: string[];
  onSort(column: string, order: string): void;
}

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TableBodyDataInterface {
  posts: PostInterface[];
  onDelete(id: string): void;
}

export interface UserFilterPropsInterface {
  onUserFilterChange: (e:React.ChangeEvent<HTMLSelectElement>) => void;
  usersData: UsersDataInterface[];
}

export interface SearchInputInterface {
  onSelectedSearchFieldChange: (e:React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchStringChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  headers: string[];
}
