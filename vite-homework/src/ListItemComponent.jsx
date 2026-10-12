import React from "react";

const ListItemComponent = (props) => {
  return (
    <>
      <li>
        {props.item}
        <button onClick={() => props.onDelete(props.id)}>Delete</button>
      </li>
    </>
  );
};

export default ListItemComponent;
