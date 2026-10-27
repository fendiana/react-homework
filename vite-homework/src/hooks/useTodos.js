import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todosApi";

const useTodos = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [requestError, setRequestError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const redirectToError = useCallback(
    (message) => {
      navigate("/error-page", {
        replace: true,
        status: { message },
      });
    },
    [navigate],
  );

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const data = await getTodos();

        if (!cancelled) {
          setItem(data);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);

        if (!cancelled) {
          setFetchError("Failed to load :(");
          redirectToError("Failed to load tasks :(");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [redirectToError]);

  const saveTodo = async (todoData, editingId) => {
    const isEditing = editingId !== null;

    try {
      setIsSaving(true);
      setRequestError("");

      const savedTodo = isEditing
        ? await updateTodo(editingId, todoData)
        : await createTodo(todoData);

      if (isEditing) {
        setItem((prev) =>
          prev.map((todo) =>
            String(todo.id) === String(editingId) ? savedTodo : todo,
          ),
        );
      } else {
        setItem((prev) => [...prev, savedTodo]);
      }

      return true;
    } catch (error) {
      console.error("Error saving tasks:", error);

      const message = isEditing
        ? "Couldn't save changes :("
        : "Couldn't add task :(";

      setRequestError(message);
      redirectToError(message);

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTodo = async (id) => {
    const currentTodo = item.find((todo) => String(todo.id) === String(id));

    if (!currentTodo) return;

    const updatedTodo = {
      ...currentTodo,
      completed: !currentTodo.completed,
    };

    try {
      setRequestError("");

      const savedTodo = await updateTodo(id, updatedTodo);

      setItem((prev) =>
        prev.map((todo) => (String(todo.id) === String(id) ? savedTodo : todo)),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      redirectToError("Couldn't update task :(");
    }
  };

  const removeTodo = async (id) => {
    try {
      setDeletingId(id);
      setRequestError("");

      await deleteTodo(id);

      setItem((prev) => prev.filter((todo) => String(todo.id) !== String(id)));
    } catch (error) {
      console.error("Error deleting task:", error);
      redirectToError("Couldn't delete task :(");
    } finally {
      setDeletingId(null);
    }
  };

  return {
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
  };
};

export default useTodos;
