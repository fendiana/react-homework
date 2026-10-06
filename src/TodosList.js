import React from "react";
// import GrandChildComponent from "./GrandChindComponent";

const TodosList = (props) => {
  return (
    <>
      <div>{props.todo}</div>;
      {/* <GrandChildComponent newPropTodo={props.todo} /> */}
    </>
  );
};

export default TodosList;
