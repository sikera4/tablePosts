import React, { useState } from "react";

export interface HeaderInfoInterface {
  headers: string[];
  onSort(column: string, order: string): void;
}

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
      {headersInfo.headers.map((header) => {
        return (<th scope="col" 
        key={header} 
        title={header} 
        className={`table__header-${header}`}
        onClick={() => {
          onSortingChange(header);
        }}>
          {header.toUpperCase()} {sortingItem && sortingItem === header && (
            header === sortingItem && sortingOrder === 'asc' ? 'asc' : 'desc')}
        </th>)
      })}
    </tr>
  )
}

export default TableHeadItems;