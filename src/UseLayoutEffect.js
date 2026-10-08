import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

const UseLayoutEffect = () => {
  const [fontSize, setFontSize] = useState(20);
  const fontRef = useRef();

  useLayoutEffect(() => {
    fontRef.current.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const handleClick = () => {
    setFontSize(fontSize + 10);
  };

  return (
    <>
      <p ref={fontRef}>Hello you!</p>
      <button onClick={handleClick}>Change font size</button>
    </>
  );
};

export default UseLayoutEffect;
