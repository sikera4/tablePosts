import React from "react";
import './TableStyles.scss';
import {TableDataInterface} from "../../Interfaces/Interfaces";
import TableHeadItems from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";



const Table = (props: TableDataInterface) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          {props.tableHeadData && <TableHeadItems headersInfo={props.tableHeadData}/>}
        </thead>
        <tbody>
          { props.tableBodyData.posts.map((post) => {
            return <TableRow 
            key={post.id} 
            post={post} 
            onDelete={props.tableBodyData.onDelete}/>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;