import React from "react";
import './TableStyles.scss';
import TableHeadItems, { HeaderInfoInterface } from "./TableHeader/TableHeader";
import TableRow, {TableBodyDataType} from "./TableRow/TableRow";

interface TableDataInterface {
  tableHeadData: HeaderInfoInterface;
  tableBodyData: TableBodyDataType;
}

const Table = (props: TableDataInterface) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          {(props.tableHeadData) ? <TableHeadItems headersInfo={props.tableHeadData}/>: ''}
        </thead>
        <tbody>
          {(props.tableBodyData) ? props.tableBodyData.map((post) => {
            return <TableRow key={post.id} post={post}/>
          }): ''}
        </tbody>
      </table>
    </div>
  )
}

export default Table;