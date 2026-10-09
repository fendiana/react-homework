import { memo } from "react";

const SecondChildComponent = memo(() => {
  console.log("SecondChildComponent render");
  return <div>SecondChildComponent</div>;
});

export default SecondChildComponent;
