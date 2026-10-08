import { useRef } from "react";
import UseEffect from "./UseEffect";
import UseLayoutEffect from "./UseLayoutEffect";
import UseState from "./UseState";
import UseReducer from "./UseReducer";
import UseRef from "./UseRef";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UseRef />

        {/* <UseReducer /> */}
        {/* <UseState /> */}
        {/* <UseLayoutEffect /> */}
        {/* <UseEffect /> */}
      </header>
    </div>
  );
}

export default App;

// З лекціїї
// const inputRef = useRef();

// const handleFocus = () => {
//   inputRef.current.focus();
//   console.log(inputRef.current.value); // при зміні ref компонент не оновлюється !!
// };

// useEffect(() => {
//   console.log("componentDidMount useEffect");
// }, []);

// useEffect(() => {
//   console.log("componentDidUpdate useEffect");
// }, [value]);

// const handleClick = () => {
//   // setValue(value + 1);
//   setIsMounted(!isMounted);
// };

// {<input ref={inputRef} />;}
// {<button onClick={handleFocus}>Focus me</button>;}

// const [isShowTimer, setIsShowTimer] = useState(false); // бульове значення варто починати з "is...""
