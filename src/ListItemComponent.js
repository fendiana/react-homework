const ListItemComponent = (props) => {
  return (
    <>
      <li key={`${props.element}`}>{props.element}</li>
    </>
  );
};

export default ListItemComponent;
