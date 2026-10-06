import React from "react";
import TodosList from "./TodosList";
import GrandChildComponent from "./GrandChindComponent";

const RenderComponent = () => {
  const toDos = [
    { id: 1, todo: "firstTodo" },
    { id: 2, todo: "secondTodo" },
    { id: 3, todo: "thirdTodo" },
    { id: 4, todo: "fourthTodo" },
  ];

  //   const myName = {
  //     name: "Dina",
  //   };

  //   const myNameinArray = ["Dina"];

  //   const myFunctionName = () => {
  //     return "Dina";
  //   };

  return (
    <div>
      {toDos.map((todo, index) => {
        return <TodosList key={index} todo={todo.todo} id={todo.id} />;
      })}

      {/* <GrandChildComponent
        myName={myName}
        myNameinArray={myNameinArray}
        myFunctionName={myFunctionName}
      /> */}
    </div>
  );
};

export default RenderComponent;

// const firstRenderValue = [];
// !!firstRenderValue.length - до бульового значення, для перевірки у випадку якщо пустий масив
