export const API_URL = "http://localhost:3030/todos";
export const AUTH_URL = "http://localhost:3030/auth/1";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const request = async (url, options = {}) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new ApiError(0, "server is unavailable :(");
  }

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getTodos = () => request(API_URL);

export const getTodoById = (id) => request(`${API_URL}/${id}`);

export const createTodo = (todoData) =>
  request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

export const updateTodo = (id, todoData) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

export const deleteTodo = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

let authStatusPromise = null;

export const getAuthStatus = () => {
  if (!authStatusPromise) {
    authStatusPromise = request(AUTH_URL)
      .then((data) => Boolean(data.isAuthenticated))
      .catch((error) => {
        authStatusPromise = null;
        throw error;
      });
  }

  return authStatusPromise;
};
