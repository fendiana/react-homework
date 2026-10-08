import React, { useState } from "react";

const UseState = () => {
  const names = ["Jack", "Ann", "Peter", "Sam", "Lucie"];
  const [name, setName] = useState("");

  function handleClick() {
    const randomIndex = Math.floor(Math.random() * names.length);
    setName(names[randomIndex]);
  }

  return (
    <>
      <p>Hello {name}!</p>
      <button onClick={handleClick}>Change name</button>
    </>
  );
};

export default UseState;
