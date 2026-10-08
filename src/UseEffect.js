import React from "react";
import { useState, useEffect } from "react";

const UseEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component was updated!");
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={handleClick}>Increase</button>
    </>
  );
};

export default UseEffect;
