import React from "react";

const ChildComponent = React.memo(({ item }) => {
  console.log("ChildComponent render");
  return <p>{item}</p>;
});

export default ChildComponent;
