import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo } from "../api/todosApi";
import TodoStatus from "../TodoComponents/TodoStatus";
import TodoForm from "../TodoComponents/TodoForm";

import styles from "../TodoComponents/ListComponent.module.css";

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const loadTodo = async () => {
      try {
        setIsLoading(true);
        setRequestError("");
        setTodo(null);

        const data = await getTodoById(id);

        if (isCurrent) {
          setTodo(data);
        }
      } catch (error) {
        console.error("Error loading task:", error);

        if (isCurrent && error.status === 404) {
          navigate("/not-found-page", { replace: true });
        } else if (isCurrent) {
          navigate("/error-page", {
            replace: true,
            state: { message: "Coudn't load task :(" },
          });
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
  }, [id, navigate]);

  const handleSave = async (formData) => {
    if (!todo || isSaving) return false;

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
      console.error("Error saving task:", error);

      if (error.status === 404) {
        navigate("/not-found-page", { replace: true });
      } else if (isCurrent) {
        navigate("/error-page", {
          replace: true,
          state: { message: "Coudn't save changes :(" },
        });
      }

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

  if (!todo) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>edit task</h2>
        <TodoStatus type="error" message={"Couldn't load task :("} />
        <Link to="/todo-list" className={styles.backLink}>
          back to home
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
