import React from "react";

const GrandChildComponent = (props) => {
  console.log(props);
  return (
    <div>
      {/* {props.myName.name}  */}
      {/* {props.myNameinArray[0]} */}
      {props.myFunctionName()}
    </div>
  );
};

export default GrandChildComponent;
