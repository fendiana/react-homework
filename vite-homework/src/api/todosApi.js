export const API_URL = "http://localhost:3030/todos";

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getTodos = () => {
  return request(API_URL);
};

export const getTodoById = (id) => {
  return request(`${API_URL}/${id}`);
};

export const createTodo = (todoData) => {
  return request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });
};

export const updateTodo = (id, todoData) => {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });
};

export const deleteTodo = (id) => {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
