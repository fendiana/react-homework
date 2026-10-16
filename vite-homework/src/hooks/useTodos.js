import { useState, useEffect } from "react";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todosApi";

const useTodos = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [requestError, setRequestError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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
        console.error("Error:", error);

        if (!cancelled) {
          setFetchError("Failed to load :(");
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
  }, []);

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
          prev.map((todo) => (todo.id === editingId ? savedTodo : todo)),
        );
      } else {
        setItem((prev) => [...prev, savedTodo]);
      }

      return true;
    } catch (error) {
      console.error("Error:", error);

      setRequestError(
        isEditing ? "Couldn't save changes :(" : "Couldn't add task :(",
      );

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const loadTodoById = async (id) => {
    try {
      setIsEditLoading(true);
      setRequestError("");

      return await getTodoById(id);
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't load task :(");
      return null;
    } finally {
      setIsEditLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    const currentTodo = item.find((todo) => todo.id === id);

    if (!currentTodo) return;

    const updatedTodo = {
      ...currentTodo,
      completed: !currentTodo.completed,
    };

    try {
      setRequestError("");

      const savedTodo = await updateTodo(id, updatedTodo);

      setItem((prev) =>
        prev.map((todo) => (todo.id === id ? savedTodo : todo)),
      );
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't update task :(");
    }
  };

  const removeTodo = async (id) => {
    try {
      setDeletingId(id);
      setRequestError("");

      await deleteTodo(id);

      setItem((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
      setRequestError("Couldn't delete task :(");
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
    isEditLoading,
    deletingId,
    saveTodo,
    loadTodoById,
    toggleTodo,
    removeTodo,
  };
};

export default useTodos;
