import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListItemComponent from "./ListItemComponent";

const ListComponent = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([
    { id: uuidv4(), note: "buy flowers" },
    { id: uuidv4(), note: "cook dinner" },
    { id: uuidv4(), note: "send a package" },
    { id: uuidv4(), note: "read a book" },
  ]);

  const onClickHandler = () => {
    if (!input.trim()) {
      return;
    }

    const newNote = { id: uuidv4(), note: input };

    const updatedNote = [...item, newNote];
    setItem(updatedNote);
    setInput("");
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const onEnterHandler = (e) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  const onDeleteHandler = (id) => {
    const updatedItems = item.filter((item) => item.id !== id);
    setItem(updatedItems);
  };

  return (
    <>
      <input
        onKeyDown={onEnterHandler}
        onChange={onChangeHandler}
        value={input}
      />
      <h3>{item.length}</h3>
      <ul>
        {item.map((item) => (
          <ListItemComponent
            key={item.id}
            id={item.id}
            item={item.note}
            onDelete={onDeleteHandler}
          />
        ))}
      </ul>
      <button onClick={onClickHandler}>Add TO DO</button>
    </>
  );
};

export default ListComponent;

// З лекції:

// -----

// const firstRenderValue = [];
// !!firstRenderValue.length - до бульового значення, для перевірки у випадку якщо пустий масив
