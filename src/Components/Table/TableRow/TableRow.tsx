import React from "react";

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type TableBodyDataType = PostInterface[];

const TableRow = ({ post } : { post: PostInterface }) => {
  return (
    <tr key={post.id}>
      {Object.keys(post).map((key) => {
        return <td key={post[key as keyof PostInterface]}>{post[key as keyof PostInterface]}</td>
      })}
    </tr>
  )
}

export default TableRow;