import { useEffect } from "react";

const UnmountComponent = () => {
  useEffect(() => {
    return () => {
      console.log("componentWillUnmount useEffect");
    };
  }, []);

  return <div></div>;
};

export default UnmountComponent;
