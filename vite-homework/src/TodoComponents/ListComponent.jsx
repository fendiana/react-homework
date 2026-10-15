import { useState, useEffect } from "react";
import ListItemComponent from "./ListItemComponent";
import styles from "./ListComponent.module.css";
import { API_URL, getTodos } from "../api/todosApi";

const ListComponent = () => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 30;

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingCreationDate, setEditingCreationDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [requestError, setRequestError] = useState("");

  const [formData, setFormData] = useState({
    note: "",
    description: "",
    completed: false,
  });
  const [item, setItem] = useState([]);

  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const data = await getTodos();

        setItem(data);
      } catch (error) {
        console.error("Error: ", error);
        setFetchError(error.message || "Failed to load :(");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = item.filter((item) => {
    if (filter === "active") {
      return !item.completed;
    }
    if (filter === "completed") {
      return item.completed;
    }
    return true;
  });

  const onClickHandler = async () => {
    const note = formData.note.trim();

    if (!note) {
      setError("task cannot be empty");
      return;
    }

    if (note.length < MIN_LENGTH) {
      setError(`task must be at least ${MIN_LENGTH} characters long`);
      return;
    }
    if (note.length > MAX_LENGTH) {
      setError(`task must be no more than ${MAX_LENGTH} characters long`);
      return;
    }

    const isEditing = editingId !== null;

    const todoData = {
      note,
      description: formData.description.trim(),
      completed: formData.completed,
      creationDate: isEditing
        ? editingCreationDate
        : new Date().toISOString().slice(0, 10),
    };

    try {
      setIsSaving(true);
      setError("");
      setRequestError("");

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const saveTodo = await response.json();

      if (isEditing) {
        setItem((prev) =>
          prev.map((item) => (item.id === editingId ? saveTodo : item)),
        );
      } else {
        setItem((prev) => [...prev, saveTodo]);
      }

      setFormData({
        note: "",
        description: "",
        completed: false,
      });
      setEditingId(null);
      setEditingCreationDate("");
      setShowForm(false);
    } catch (error) {
      setRequestError(
        isEditing ? "Couldn't save changes :(" : "Couldn't add task :(",
      );
    } finally {
      setIsSaving(false);
    }

    // setFormData({ ...formData, note: "" });
    // setShowForm(false);
  };

  // const onChangeHandler = (e) => {
  //   const value = e.target.value;
  //   setInput(value);
  //   setError("");
  // };

  // const onEnterHandler = (e) => {
  //   if (e.key === "Enter") {
  //     onClickHandler();
  //   }
  // };

  const onEditHandler = async (id) => {
    try {
      setIsEditLoading(true);
      setRequestError("");
      setError("");

      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to load task");
      }

      const todo = await response.json();

      setEditingId(todo.id);
      setEditingCreationDate(todo.creationDate || "");

      setFormData({
        note: todo.note,
        description: todo.description,
        completed: todo.completed,
      });

      setShowForm(true);
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't load task :(");
    } finally {
      setIsEditLoading(false);
    }
  };

  const onDoneHandler = async (id) => {
    const currentTodo = item.find((todo) => todo.id === id);

    if (!currentTodo) return;

    const updatedTodo = {
      ...currentTodo,
      completed: !currentTodo.completed,
    };

    try {
      setRequestError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const savedTodo = await response.json();

      setItem((prev) =>
        prev.map((todo) => (todo.id === id ? savedTodo : todo)),
      );
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't update task :(");
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      setDeletingId(id);
      setRequestError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setItem((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't delete task :(");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>My To Do List</h2>
        <p className={styles.listMessage}>Loading tasks...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>My To Do List</h2>
        <p className={styles.error}>{fetchError}</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listMainTitle}>My To Do List</h2>
      {requestError && <p className={styles.error}>{requestError}</p>}
      {item.length === 0 && !showForm && (
        <p className={styles.listMessage}>You have no tasks yet</p>
      )}
      {item.length > 0 && (
        <>
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
                onEdit={onEditHandler}
                isDeleting={deletingId === item.id}
                completed={item.completed}
              />
            ))}
          </ul>
          <p className={styles.taskCount}>
            tasks left: {item.filter((item) => !item.completed).length}
          </p>
        </>
      )}
      {!showForm && (
        <button
          className={styles.listAddButton}
          onClick={() => setShowForm(true)}
        >
          add new TO DO
        </button>
      )}
      {showForm && (
        <>
          <input
            className={styles.listInput}
            value={formData.note}
            name="note"
            placeholder="enter task..."
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                note: e.target.value,
              }))
            }
          />
          <textarea
            className={styles.listInput}
            value={formData.description}
            name="description"
            placeholder="describe your task..."
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <label className={styles.checkboxLabel}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={formData.completed}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  completed: e.target.checked,
                }))
              }
            />
            already done
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={styles.listAddButton}
            onClick={onClickHandler}
            disabled={isSaving}
          >
            {isSaving
              ? "saving..."
              : editingId !== null
                ? "save changes"
                : "add TO DO"}
          </button>
        </>
      )}
    </div>
  );
};

export default ListComponent;

// { id: uuidv4(), note: "buy flowers", completed: false },
// { id: uuidv4(), note: "cook dinner", completed: false },
// { id: uuidv4(), note: "send a package", completed: false },
// { id: uuidv4(), note: "read a book", completed: false },

// З лекції:

// -----

// const firstRenderValue = [];
// !!firstRenderValue.length - до бульового значення, для перевірки у випадку якщо пустий масив
