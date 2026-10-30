import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  clearTodoErrors,
} from "../features/todos/todosSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, isLoading, fetchError, requestError, isSaving, deletingId } =
    useSelector((state) => state.todos);

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let active = true;

    dispatch(clearTodoErrors());

    const loadTodos = async () => {
      const result = await dispatch(fetchTodos());

      if (!active || !fetchTodos.rejected.match(result)) {
        return;
      }

      navigate("/error-page", {
        replace: true,
        state: {
          message: result.payload?.message ?? "Failed to load :(",
        },
      });
    };

    loadTodos();

    return () => {
      active = false;
    };
  }, [dispatch, navigate]);

  const filteredItems = items.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const onAddClickHandler = () => {
    dispatch(clearTodoErrors());
    setShowForm(true);
  };

  const onCancelHandler = () => {
    setShowForm(false);
    dispatch(clearTodoErrors());
  };

  const onSubmitHandler = async (formData) => {
    const todoData = {
      note: formData.note.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
      creationDate: new Date().toISOString().slice(0, 10),
    };

    const result = await dispatch(addTodo(todoData));

    if (addTodo.fulfilled.match(result)) {
      setShowForm(false);
      dispatch(clearTodoErrors());
      return true;
    }

    navigate("/error-page", {
      replace: true,
      state: {
        message: result.payload?.message ?? "Couldn't add task :(",
      },
    });

    return false;
  };

  const onDoneHandler = async (id) => {
    const todo = items.find((item) => String(item.id) === String(id));

    if (!todo) return;

    const result = await dispatch(
      updateTodo({
        id,
        todoData: {
          ...todo,
          completed: !todo.completed,
        },
      }),
    );

    if (updateTodo.rejected.match(result)) {
      navigate("/error-page", {
        replace: true,
        state: {
          message: result.payload?.message ?? "Couldn't update task :(",
        },
      });
    }
  };

  const onDeleteHandler = async (id) => {
    const result = await dispatch(deleteTodo(id));

    if (deleteTodo.rejected.match(result)) {
      navigate("/error-page", {
        replace: true,
        state: {
          message: result.payload?.message ?? "Couldn't delete task :(",
        },
      });
    }
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
      {items.length === 0 && !showForm && <TodoStatus type="empty" />}
      {items.length > 0 && (
        <>
          <TodoFilter filter={filter} onChange={setFilter} />
          <TodoList
            items={filteredItems}
            onDone={onDoneHandler}
            onDelete={onDeleteHandler}
            deletingId={deletingId}
          />
          <TodoCount items={items} />
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
          onCancel={onCancelHandler}
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
