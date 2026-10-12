import React from "react";
import styles from "./ListItemComponent.module.css";

const ListItemComponent = (props) => {
  return (
    <>
      <li className={styles.listItem}>
        {props.item}
        <button
          className={styles.listItemDoneButton}
          onClick={() => props.onDelete(props.id)}
        >
          done
        </button>
      </li>
    </>
  );
};

export default ListItemComponent;
