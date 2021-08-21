import React from 'react';
import './SearchInput.scss';
import { SearchInputInterface } from '../../Interfaces/Interfaces';

const SearchInput = (props: SearchInputInterface) => {
  const { onSelectedSearchFieldChange, onSearchStringChange, headers } = props;
  return (
    <div className="search-input">
      <span>
        Search through posts&apos;
        <select
          defaultValue="none"
          className="search-input__search-field-select"
          onChange={onSelectedSearchFieldChange}
        >
          <option value="none">Choose a field...</option>
          {headers.map((header) => (
            <option key={header} value={header}>{header.toUpperCase()}</option>
          ))}
        </select>
        :
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="search-input__input"
        onChange={onSearchStringChange}
      />
    </div>
  );
};

export default SearchInput;
