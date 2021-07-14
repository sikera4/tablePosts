import React from "react";
import './UserFilter.scss';
import { UserFilterPropsInterface } from '../../Interfaces/Interfaces';
 

const UserFilter = (props: UserFilterPropsInterface) => {
  return (
    <div className="user-filter">
      <span className="user-filter__filter-caption">Filter posts by user: </span>
      <select className="user-filter__filter" defaultValue="0"
      onChange={props.onUserFilterChange}>
        <option value="0">Choose a user...</option>
        {props.usersData.map(user => {
          return (
            <option key={user.id} value={user.id}
            >{`Username: ${user.username}, ID: ${user.id}`}</option>)
        })}
      </select>
    </div>
  )
}

export default UserFilter;