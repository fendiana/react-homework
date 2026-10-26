import { useState } from "react";
import useTodos from "../hooks/useTodos";

import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import TodoStatus from "./TodoStatus";
import TodoCount from "./TodoCount";

import styles from "./ListComponent.module.css";

const EMPTY_FORM = {
  note: "",
  description: "",
  completed: false,
};

const ListComponent = () => {
  const {
    item,
    isLoading,
    fetchError,
    requestError,
    setRequestError,
    isSaving,
    deletingId,
    saveTodo,
    toggleTodo,
    removeTodo,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredItems = item.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const onAddClickHandler = () => {
    setRequestError("");
    setShowForm(true);
  };

  const onSubmitHandler = async (formData) => {
    const todoData = {
      note: formData.note.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
      creationDate: new Date().toISOString().slice(0, 10),
    };

    const success = await saveTodo(todoData, null);

    if (success) {
      setShowForm(false);
      setRequestError("");
    }

    return success;
  };

  if (isLoading) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>My To Do List</h2>
        <TodoStatus type="loading" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>My To Do List</h2>
        <TodoStatus type="error" message={fetchError} />
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listMainTitle}>My To Do List</h2>
      {requestError && !showForm && (
        <TodoStatus type="error" message={requestError} />
      )}
      {item.length === 0 && !showForm && <TodoStatus type="empty" />}
      {item.length > 0 && (
        <>
          <TodoFilter filter={filter} onChange={setFilter} />
          <TodoList
            items={filteredItems}
            onDone={toggleTodo}
            onDelete={removeTodo}
            deletingId={deletingId}
          />
          <TodoCount items={item} />
        </>
      )}
      {!showForm && (
        <button className={styles.listAddButton} onClick={onAddClickHandler}>
          add new TO DO
        </button>
      )}
      {showForm && (
        <TodoForm
          initialData={EMPTY_FORM}
          isSaving={isSaving}
          requestError={requestError}
          onSubmit={onSubmitHandler}
        />
      )}
    </div>
  );
};

export default ListComponent;

// З лекції:

// -----

// const firstRenderValue = [];
// !!firstRenderValue.length - до бульового значення, для перевірки у випадку якщо пустий масив
