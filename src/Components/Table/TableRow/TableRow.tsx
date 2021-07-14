import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {PostInterface} from "../../../Interfaces/Interfaces";

const TableRow = ({ post, onDelete } : { post: PostInterface, onDelete: (id:string) => void }) => {
  return (
    <tr key={post.id}>
      {Object.keys(post).map((key, ind) => {
        return <td key={post[key as keyof PostInterface].toString() + ind.toString()}>{post[key as keyof PostInterface]}</td>
      })}
      <td className="table__delete-icon" onClick={() => {
        onDelete(post.id.toString());
      }}><DeleteIcon/></td>
    </tr>
  )
}

export default TableRow;