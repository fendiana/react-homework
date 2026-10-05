import { useState } from "react";
import ListItemComponent from "./ListItemComponent";
import CounterComponent from "./CounterComponent";

const ListComponent = () => {
  const [input, setInput] = useState([""]);
  const [item, setItem] = useState([]);

  const onClickHandler = (input) => {
    const updatedElement = [...item, input];
    setItem(updatedElement);
    setInput("");
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const enterHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={enterHandler}>
        <input onChange={onChangeHandler} value={input} />

        <CounterComponent count={item.length} />

        <ul>
          {item.map((element) => (
            <ListItemComponent element={element} />
          ))}
        </ul>
        <button type="submit" onClick={() => onClickHandler(input)}>
          Add TO DO
        </button>
      </form>
    </>
  );
};

export default ListComponent;
