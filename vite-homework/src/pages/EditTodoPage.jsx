import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTodoById, updateTodo } from "../api/todosApi";
import TodoStatus from "../TodoComponents/TodoStatus";
import TodoForm from "../TodoComponents/TodoForm";

import styles from "../TodoComponents/ListComponent.module.css";

const EditTodoPage = () => {
  const { id } = useParams();

  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const loadTodo = async () => {
      try {
        setIsLoading(true);
        setFetchError("");
        setTodo(null);

        const data = await getTodoById(id);

        if (isCurrent) {
          setTodo(data);
        }
      } catch (error) {
        console.error("Error:", error);

        if (isCurrent) {
          setFetchError("Coudn't load task :(");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    loadTodo();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  const handleSave = async (formData) => {
    if (!todo) return false;

    try {
      setIsSaving(true);
      setRequestError("");

      await updateTodo(id, {
        ...todo,
        note: formData.note.trim(),
        description: formData.description.trim(),
        completed: formData.completed,
      });

      return true;
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Coudn't load task :(");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>edit task</h2>
        <TodoStatus type="loading" message="loading task..." />
      </div>
    );
  }

  if (fetchError || !todo) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>edit task</h2>
        <TodoStatus
          type="error"
          message={fetchError || "Couldn't load task :("}
        />
        <Link to="/todo-list" className={styles.backLink}>
          back to to do list
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listMainTitle}>edit task</h2>

      <TodoForm
        key={todo.id}
        initialData={todo}
        isEditing={true}
        isSaving={isSaving}
        requestError={requestError}
        onSubmit={handleSave}
        submitAsLink={true}
        submitTo="/todo-list"
      />
    </div>
  );
};

export default EditTodoPage;
