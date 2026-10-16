import { useState } from "react";
import styles from "./ListComponent.module.css";

const MIN_LENGTH = 3;
const MAX_LENGTH = 30;

const TodoForm = ({
  initialData,
  isEditing,
  isSaving,
  requestError,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(() => ({
    note: initialData.note ?? "",
    description: initialData.description ?? "",
    completed: initialData.completed ?? false,
  }));

  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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

    const success = await onSubmit({
      ...formData,
      note,
      description: formData.description.trim(),
    });

    if (success) {
      setError("");
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input
        className={styles.listInput}
        value={formData.note}
        name="note"
        placeholder="enter task..."
        onChange={onChangeHandler}
      />
      <textarea
        className={styles.listInput}
        value={formData.description}
        name="description"
        placeholder="describe your task..."
        onChange={onChangeHandler}
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
      {requestError && <p className={styles.error}>{requestError}</p>}
      <button
        className={styles.listAddButton}
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "saving..." : isEditing ? "save changes" : "add TO DO"}
      </button>
    </form>
  );
};

export default TodoForm;
