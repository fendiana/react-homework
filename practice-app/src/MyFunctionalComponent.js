import { useState } from "react";

function MyFunctionalComponent(props) {
  return (
    <div>
      <p>Student: {props.name}</p>
      <p>House: {props.house}</p>
    </div>
  );
}

export default MyFunctionalComponent;
