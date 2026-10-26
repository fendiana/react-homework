import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import EditTodoPage from "./pages/EditTodoPage";
import AboutPage from "./pages/AboutPage";
import ListComponent from "./TodoComponents/ListComponent";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="todo-list" element={<ListComponent />} />
        <Route path="todo-list/:id" element={<EditTodoPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
