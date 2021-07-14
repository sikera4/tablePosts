import React from 'react';
import './SearchInput.scss';
import { SearchInputInterface } from '../../Interfaces/Interfaces';


const SearchInput = (props: SearchInputInterface) => {
  return (
    <div className="search-input">
      <span>Search through posts'
        <select defaultValue="none" className="search-input__search-field-select"
        onChange={props.onSelectedSearchFieldChange}>
          <option value="none">Choose a field...</option>
          {props.headers.map((header) => {
            return (
              <option key={header} value={header}>{header.toUpperCase()}</option>
            )
          })}
          </select>: 
        </span>
      <input type="text"
      placeholder="Search..."
      className="search-input__input"
      onChange={props.onSearchStringChange}/>
    </div>
  )
}

export default SearchInput;