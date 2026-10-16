import ListItemComponent from "./ListItemComponent";
import styles from "./ListComponent.module.css";

const TodoList = ({ items, onDone, onDelete, onEdit, deletingId }) => {
  console.log(
    "todo ids:",
    items.map((todo) => todo.id),
  );

  return (
    <ul className={styles.list}>
      {items.map((todo) => (
        <ListItemComponent
          key={todo.id}
          id={todo.id}
          item={todo.note}
          description={todo.description}
          onDone={onDone}
          onDelete={onDelete}
          onEdit={onEdit}
          isDeleting={deletingId === todo.id}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
