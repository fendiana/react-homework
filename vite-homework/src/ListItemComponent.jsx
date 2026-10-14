import React from "react";
import styles from "./ListItemComponent.module.css";

const ListItemComponent = (props) => {
  return (
    <li className={styles.listItem}>
      <p className={props.completed ? styles.completed : ""}>{props.item}</p>
      <div className={styles.changeBtns}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.onDone(props.id)}
        />
        <button
          className={styles.listItemDoneButton}
          onClick={() => props.onDelete(props.id)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default ListItemComponent;
