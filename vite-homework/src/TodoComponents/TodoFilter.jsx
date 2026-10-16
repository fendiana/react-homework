import styles from "./ListComponent.module.css";

const TodoFilter = ({ filter, onChange }) => {
  return (
    <div className={styles.listFilterContainer}>
      <h3 className={styles.listFilterTitle}>tasks:</h3>
      <select
        className={styles.listFilter}
        value={filter}
        name="filter"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
};

export default TodoFilter;
