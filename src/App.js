import { useState } from "react";
import ListComponent from "./ListComponent";
import MyClassComponent from "./MyClassComponent";

import "./App.css";

function App() {
  const [isShowTimer, setIsShowTimer] = useState(false); // бульове значення варто починати з "is...""
  return (
    <div className="App">
      <header className="App-header">
        {isShowTimer ? <MyClassComponent /> : <ListComponent />}
        <button onClick={() => setIsShowTimer((prev) => !prev)}>
          Show timer
        </button>
      </header>
    </div>
  );
}

export default App;
