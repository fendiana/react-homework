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
  creationDate: "",
};

const ListComponent = () => {
  const {
    item,
    isLoading,
    fetchError,
    requestError,
    setRequestError,
    isSaving,
    isEditLoading,
    deletingId,
    saveTodo,
    loadTodoById,
    toggleTodo,
    removeTodo,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [initialData, setInitialData] = useState(() => ({ ...EMPTY_FORM }));
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
    setEditingId(null);
    setInitialData({ ...EMPTY_FORM });
    setRequestError("");
    setShowForm(true);
  };

  const onEditHandler = async (id) => {
    const todo = await loadTodoById(id);

    if (!todo) return;

    setEditingId(todo.id);

    setInitialData({
      note: todo.note ?? "",
      description: todo.description ?? "",
      completed: todo.completed ?? false,
      creationDate: todo.creationDate ?? "",
    });

    setShowForm(true);
  };

  const onSubmitHandler = async (formData) => {
    const todoData = {
      note: formData.note.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
      creationDate:
        editingId !== null
          ? initialData.creationDate
          : new Date().toISOString().slice(0, 10),
    };

    const success = await saveTodo(todoData, editingId);

    if (success) {
      setShowForm(false);
      setEditingId(null);
      setInitialData({ ...EMPTY_FORM });
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
      {isEditLoading && <TodoStatus type="loading" message="loading task..." />}
      {item.length === 0 && !showForm && <TodoStatus type="empty" />}
      {item.length > 0 && (
        <>
          <TodoFilter filter={filter} onChange={setFilter} />
          <TodoList
            items={filteredItems}
            onDone={toggleTodo}
            onDelete={removeTodo}
            onEdit={onEditHandler}
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
          key={editingId ?? "new"}
          initialData={initialData}
          isEditing={editingId !== null}
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
