import styles from "./ListItemComponent.module.css";

const ListItemComponent = ({
  id,
  item,
  description,
  completed,
  onDone,
  onDelete,
  onEdit,
  isDeleting,
}) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItemText}>
        <p className={completed ? styles.completed : ""}>{item}</p>
        {description && <p className={styles.todoDescription}>{description}</p>}
      </div>
      <div className={styles.changeBtns}>
        <button
          className={styles.listItemEditButton}
          onClick={() => onEdit(id)}
        >
          edit
        </button>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => onDone(id)}
        />
        <button
          className={styles.listItemDoneButton}
          onClick={() => onDelete(id)}
          disabled={isDeleting}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default ListItemComponent;
