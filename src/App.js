import MyFunctionalComponent from "./MyFunctionalComponent";
import MyClassComponent from "./MyClassComponent";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>New Student Info</h2>
        <MyFunctionalComponent name="Harry Potter" house="Gryffindor" />
        <MyClassComponent />
      </header>
    </div>
  );
}

export default App;
