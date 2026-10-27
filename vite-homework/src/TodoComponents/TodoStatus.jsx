import Loader from "../components/Loader";
import styles from "./ListComponent.module.css";

const TodoStatus = ({ type, message }) => {
  if (type === "loading") {
    return <Loader label={message ?? "loading tasks..."} />;
  }

  const text =
    message ??
    (type === "empty" ? "You have no tasks yet" : "Failed to load :(");

  const className = type === "error" ? styles.error : styles.listMessage;

  return <p className={className}>{text}</p>;
};

export default TodoStatus;
