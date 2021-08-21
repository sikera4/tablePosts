import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { PostInterface } from '../../../Interfaces/Interfaces';

// eslint-disable-next-line no-unused-vars
const TableRow = ({ post, onDelete } : { post: PostInterface, onDelete: (id:string) => void }) => (
  <tr key={post.id}>
    {Object.keys(post).map((key, ind) => (
      <td key={post[key as keyof PostInterface].toString() + ind.toString()}>
        {post[key as keyof PostInterface]}
      </td>
    ))}
    <td>
      <button
        className="table__delete-icon"
        onClick={() => {
          onDelete(post.id.toString());
        }}
        type="button"
      >
        <DeleteIcon />
      </button>

    </td>
  </tr>
);

export default TableRow;
