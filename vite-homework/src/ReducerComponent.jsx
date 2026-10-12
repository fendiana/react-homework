import { useReducer } from "react";
import React from "react";

const ReducerComponent = () => {
  const reducer = (state, action) => {
    if (action.type === "increment") {
      return { count: state.count + 1 };
    }
    if (action.type === "decrement") {
      return { count: state.count - 1 };
    }
    if (action.type === "reset") {
      return { count: 0 };
    }
  };

  const [value, dispatch] = useReducer(reducer, { count: 0 });

  const handleClick = (type) => {
    dispatch(type);
  };

  return (
    <>
      <p>{value.count}</p>
      <button onClick={() => handleClick({ type: "increment" })}>Add</button>
      <button onClick={() => handleClick({ type: "decrement" })}>Minus</button>
      <button onClick={() => handleClick({ type: "reset" })}>Reset</button>
    </>
  );
};

export default ReducerComponent;
