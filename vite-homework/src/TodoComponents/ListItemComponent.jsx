import { Link } from "react-router-dom";
import styles from "./ListItemComponent.module.css";

const ListItemComponent = ({
  id,
  item,
  description,
  completed,
  onDone,
  onDelete,
  isDeleting,
}) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItemText}>
        <p className={completed ? styles.completed : ""}>{item}</p>
        {description && <p className={styles.todoDescription}>{description}</p>}
      </div>
      <div className={styles.changeBtns}>
        <Link className={styles.listItemEditButton} to={`/todo-list/${id}`}>
          edit
        </Link>
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
