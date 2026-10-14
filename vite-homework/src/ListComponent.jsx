import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListItemComponent from "./ListItemComponent";
import styles from "./ListComponent.module.css";

const ListComponent = () => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 30;

  const [input, setInput] = useState("");
  const [item, setItem] = useState([
    { id: uuidv4(), note: "buy flowers", completed: false },
    { id: uuidv4(), note: "cook dinner", completed: false },
    { id: uuidv4(), note: "send a package", completed: false },
    { id: uuidv4(), note: "read a book", completed: false },
  ]);

  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const filteredItems = item.filter((item) => {
    if (filter === "active") {
      return !item.completed;
    }
    if (filter === "completed") {
      return item.completed;
    }
    return true;
  });

  const onClickHandler = () => {
    if (!input.trim()) {
      setError("task cannot be empty");
      return;
    }

    if (input.trim().length < MIN_LENGTH) {
      setError(`task must be at least ${MIN_LENGTH} characters long`);
      return;
    }
    if (input.trim().length > MAX_LENGTH) {
      setError(`task must be no more than ${MAX_LENGTH} characters long`);
      return;
    }

    const newNote = { id: uuidv4(), note: input.trim(), completed: false };

    const updatedNote = [...item, newNote];
    setItem(updatedNote);
    setInput("");
    setError("");
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
    setError("");
  };

  const onEnterHandler = (e) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  const onDoneHandler = (id) => {
    const updatedItems = item.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItem(updatedItems);
  };

  const onDeleteHandler = (id) => {
    const updatedItems = item.filter((item) => item.id !== id);
    setItem(updatedItems);
  };

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listMainTitle}>My To Do List</h2>
      <div className={styles.listFilterContainer}>
        <h3 className={styles.listFilterTitle}>tasks:</h3>
        <select
          className={styles.listFilter}
          value={filter}
          name="filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <ul className={styles.list}>
        {filteredItems.map((item) => (
          <ListItemComponent
            key={item.id}
            id={item.id}
            item={item.note}
            onDone={onDoneHandler}
            onDelete={onDeleteHandler}
            completed={item.completed}
          />
        ))}
      </ul>
      <p className={styles.taskCount}>
        tasks left: {item.filter((item) => !item.completed).length}
      </p>
      <input
        className={styles.listInput}
        onKeyDown={onEnterHandler}
        onChange={onChangeHandler}
        value={input}
        name="task"
        placeholder="enter task..."
      />
      {error && <p className={styles.error}>{error}</p>}
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
