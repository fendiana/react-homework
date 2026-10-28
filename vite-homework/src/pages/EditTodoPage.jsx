import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, fetchTodoById, cleartCurrentTodo } from "../api/todosApi";
import TodoStatus from "../TodoComponents/TodoStatus";
import TodoForm from "../TodoComponents/TodoForm";

import styles from "../TodoComponents/ListComponent.module.css";

const EditTodoPage = () => {
  const { id } = useParams();
  const dispatch = useNavigate();
  const navigate = useNavigate();

  const {
    currentTodo,
    isEditLoading,
    currentTodoError,
    isSaving,
    requestError,
  } = useSelector((state) => state.todos);

  useEffect(() => {
    let active = true;

    dispatch(clearCurrentTodo());

    const loadTodo = async () => {
      const result = await dispatch(fetchTodoById(id));

      if (!active || !fetchTodoById.rejected.match(result)) {
        return;
      }

      const error = result.payload;

      if (error.status === 404) {
        navigate("/not-found-page", { replace: true });
      } else if (isCurrent) {
        navigate("/error-page", {
          replace: true,
          state: { message: error?.message ?? "Coudn't load task :(" },
        });
      }
    };

    loadTodo();

    return () => {
      active = false;
      dispatch(cleartCurrentTodo());
    };
  }, [id, dispatch, navigate]);

  const handleSave = async (formData) => {
    if (!currentTodo || isSaving) return false;

    const todoData = {
      ...currentTodo,
      note: formData.note.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
    };

    const result = awaitvdispatch(
      updateTodo({
        id,
        todoData,
      }),
    );

    if (updateTodo.fulfilled.match(result)) {
      return true;
    }

    const error = result.payload;

    if (error?.status === 404) {
      navigate("/not-found-page", { replace: true });
    } else {
      navigate("/error-page", {
        replace: true,
        state: { message: error?.message ?? "Coudn't save changes :(" },
      });
    }

    return false;
  };

  if (isEditLoading || (!currentTodo && !currentTodoError)) {
    return (
      <div className={styles.listContainer}>
        <h2 className={styles.listMainTitle}>edit task</h2>
        <TodoStatus type="loading" message="loading task..." />
      </div>
    );
  }

  if (!currentTodo) {
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
        key={String(currentTodo.id)}
        initialData={currentTodo}
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
