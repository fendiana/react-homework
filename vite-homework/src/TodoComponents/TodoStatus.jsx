import styles from "./ListComponent.module.css";

const TodoStatus = ({ type, message }) => {
  const text =
    message ??
    (type === "loading"
      ? "Loading tasks..."
      : type === "empty"
        ? "You have no tasks yet"
        : "Failed to load :(");

  const className = type === "error" ? styles.error : styles.listMessage;

  return <p className={className}>{text}</p>;
};

export default TodoStatus;
