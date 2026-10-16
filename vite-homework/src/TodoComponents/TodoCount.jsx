import styles from "./ListComponent.module.css";

const TodoStats = ({ items }) => {
  const tasksLeft = items.filter((todo) => !todo.completed).length;

  return <p className={styles.taskCount}>tasks left: {tasksLeft}</p>;
};

export default TodoStats;
