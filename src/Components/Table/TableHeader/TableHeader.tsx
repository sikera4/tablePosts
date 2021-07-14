import React, { useState } from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {HeaderInfoInterface} from "../../../Interfaces/Interfaces";


const TableHeadItems = ({ headersInfo }: {headersInfo: HeaderInfoInterface}) => {
  const [sortingItem, setSortingItem] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');
  const onSortingChange = (item: string) => {
    const order = sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortingItem(item);
    setSortingOrder(order);
    headersInfo.onSort(item, order);
  }
  return (
    <tr>
      {(headersInfo.headers) ? headersInfo.headers.map((header) => {
        return (<th 
        scope="col" 
        key={header} 
        title={header} 
        className={`table__header-${header}`}
        onClick={() => {
          onSortingChange(header);
        }}>{header.toUpperCase()}{sortingItem && sortingItem === header && (
            header === sortingItem && sortingOrder === 'asc' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>)}</th>)
      }): ''}<th scope="col" className="table__header-delete">DELETE</th>
    </tr>
  )
}

export default TableHeadItems;