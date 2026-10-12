import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListItemComponent from "./ListItemComponent";
import styles from "./ListComponent.module.css";

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
    <div className={styles.listContainer}>
      <h2 className={styles.listMainTitle}>My To Do List</h2>
      <ul className={styles.list}>
        {item.map((item) => (
          <ListItemComponent
            key={item.id}
            id={item.id}
            item={item.note}
            onDelete={onDeleteHandler}
          />
        ))}
      </ul>
      <h3 className={styles.taskCount}>tasks left: {item.length}</h3>
      <input
        className={styles.listInput}
        onKeyDown={onEnterHandler}
        onChange={onChangeHandler}
        value={input}
        placeholder="enter task..."
      />
      <button className={styles.listAddButton} onClick={onClickHandler}>
        add TO DO
      </button>
    </div>
  );
};

export default ListComponent;

// З лекції:

// -----

// const firstRenderValue = [];
// !!firstRenderValue.length - до бульового значення, для перевірки у випадку якщо пустий масив
