import React from 'react';
import './TableStyles.scss';
import { TableDataInterface } from '../../Interfaces/Interfaces';
import TableHeadItems from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';

const Table = (props: TableDataInterface) => {
  const { tableHeadData, tableBodyData } = props;
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          {tableHeadData && <TableHeadItems headersInfo={tableHeadData} />}
        </thead>
        <tbody>
          {tableBodyData.posts.map((post) => (
            <TableRow
              key={post.id}
              post={post}
              onDelete={props.tableBodyData.onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
