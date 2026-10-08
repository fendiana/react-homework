import React, { useRef } from "react";

const UseRef = () => {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
    console.log("focus");
  };

  const handleBlur = () => {
    inputRef.current.blur();
    console.log("blur");
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Фокус</button>
      <button onClick={handleBlur}>Блюр</button>
    </>
  );
};

export default UseRef;
