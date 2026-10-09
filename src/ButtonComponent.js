import React from "react";

const ButtonComponent = React.memo((props) => {
  console.log("ButtonComponent render");

  return (
    <button type={props.type} onClick={() => props.onDelete(props.id)}>
      {props.text}
    </button>
  );
});

export default ButtonComponent;
