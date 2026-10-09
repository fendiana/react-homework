import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import ChildComponent from "./ChildComponent";
import ButtonComponent from "./ButtonComponent";

const ReactMemo = () => {
  const [fruits, setFruits] = useState([
    { id: uuidv4(), note: "kiwi" },
    { id: uuidv4(), note: "banana" },
    { id: uuidv4(), note: "fig" },
  ]);

  const onDeleteHandler = useCallback((id) => {
    setFruits((prevFruits) => prevFruits.filter((item) => item.id !== id));
  }, []);

  return (
    <>
      {" "}
      <h3>{fruits.length}</h3>
      <ul>
        {fruits.map((item) => (
          <li key={item.id}>
            {" "}
            <ChildComponent item={item.note} />
            <ButtonComponent
              text="Видалити"
              type="button"
              id={item.id}
              onDelete={onDeleteHandler}
            />
          </li>
        ))}
      </ul>
      <ChildComponent item="Цей текст не залежить від фруктів" />
    </>
  );
};

export default ReactMemo;
