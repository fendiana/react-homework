export const API_URL = "http://localhost:3030/todos";

export const getTodos = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load :(");
  }

  return response.json();
};
