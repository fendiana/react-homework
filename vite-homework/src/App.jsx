import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

import "./App.css";

const Layout = lazy(() => import("./layouts/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const EditTodoPage = lazy(() => import("./pages/EditTodoPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ListComponent = lazy(() => import("./TodoComponents/ListComponent"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  return (
    <Suspense fallback={<Loader label="loading page..." />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="error-page" element={<ErrorPage />} />
          <Route path="not-found-page" element={<NotFoundPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="todo-list" element={<ListComponent />} />
            <Route path="todo-list/:id" element={<EditTodoPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/not-found-page" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
