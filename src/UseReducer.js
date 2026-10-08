import React, { useReducer, useState } from "react";

const UseReducer = () => {
  const initialState = {
    name: "",
    lastName: "",
    birthYear: "",
  };

  const reducer = (state, action) => {
    if (action.type === "name") {
      return { ...state, name: action.value };
    }
    if (action.type === "lastName") {
      return { ...state, lastName: action.value };
    }
    if (action.type === "birthYear") {
      return { ...state, birthYear: action.value };
    }
    return state;
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [value, dispatch] = useReducer(reducer, initialState);

  const handleClick = (type, inputValue) => {
    dispatch({ type: type, value: inputValue });
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={() => handleClick("name", name)}>Імʼя</button>

      <input
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <button onClick={() => handleClick("lastName", lastName)}>
        Прізвище
      </button>

      <input
        type="text"
        value={birthYear}
        onChange={(event) => setBirthYear(event.target.value)}
      />
      <button onClick={() => handleClick("birthYear", birthYear)}>
        Рік народження
      </button>

      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};

export default UseReducer;
