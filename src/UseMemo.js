import React, { useState, useMemo } from "react";

const UseMemo = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const amount = useMemo(() => {
    return numbers.reduce((total, number) => total + number, 0);
  }, [numbers]);

  const handleListChange = () => {
    setNumbers([...numbers, 6]);
  };

  console.log("render");

  return (
    <>
      {numbers.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <p>{amount}</p>
      <button onClick={handleListChange}>Change</button>
    </>
  );
};

export default UseMemo;
