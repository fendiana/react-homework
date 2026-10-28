import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../../api/todosApi";

const createErrorPayload = (error, message) => ({
  message,
  status: error?.status ?? null,
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      return await getTodos();
    } catch (error) {
      return rejectWithValue(createErrorPayload(error, "Failed to load :("));
    }
  },
);

export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById",
  async (id, { rejectWithValue }) => {
    try {
      return await getTodoById(id);
    } catch (error) {
      return rejectWithValue(
        createErrorPayload(error, "Couldn't load tasks :("),
      );
    }
  },
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      return await createTodo(todoData);
    } catch (error) {
      return rejectWithValue(createErrorPayload(error, "Couldn't add task :("));
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todoData }, { rejectWithValue }) => {
    try {
      return await updateTodoApi(id, todoData);
    } catch (error) {
      return rejectWithValue(
        createErrorPayload(error, "Couldn't save changes :("),
      );
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTodoApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        createErrorPayload(error, "Couldn't delete task :("),
      );
    }
  },
);

const initialState = {
  items: [],
  currentTodo: null,
  isLoading: true,
  fetchError: null,
  isEditLoading: false,
  currentTodoError: null,
  isSaving: false,
  requestError: null,
  deletingId: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    clearTodoErrors(state) {
      state.fetchError = null;
      state.requestError = null;
      state.currentTodoError = null;
    },

    clearCurrentTodo(state) {
      state.currentTodo = null;
      state.currentTodoError = null;
      state.isEditLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.payload?.message ?? "Failed to load :(";
      })

      .addCase(fetchTodoById.pending, (state) => {
        state.isEditLoading = true;
        state.currentTodo = null;
        state.currentTodoError = null;
      })
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.isEditLoading = false;
        state.currentTodo = action.payload;
      })
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.isEditLoading = false;
        state.currentTodoError = action.payload ?? {
          message: "Couldn't load task :(",
          status: null,
        };
      })

      .addCase(addTodo.pending, (state) => {
        state.isSaving = true;
        state.requestError = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isSaving = false;
        state.requestError = action.payload?.message ?? "Couldn't add task :(";
      })

      .addCase(updateTodo.pending, (state) => {
        state.isSaving = true;
        state.requestError = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isSaving = false;

        const savedTodo = action.payload;
        const id = action.meta.arg.id;

        const index = state.items.findIndex(
          (todo) => String(todo.id) === String(id),
        );

        if (index !== -1) {
          state.items[index] = savedTodo;
        }

        if (state.currentTodo && String(state.currentTodo.id) === String(id)) {
          state.currentTodo = savedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isSaving = false;
        state.requestError =
          action.payload?.message ?? "Couldn't save changes :(";
      })

      .addCase(deleteTodo.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.requestError = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deletingId = null;

        state.items = state.items.filter(
          (todo) => String(todo.id) !== String(action.payload),
        );

        if (
          state.currentTodo &&
          String(state.currentTodo.id) === String(action.payload)
        ) {
          state.currentTodo = null;
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deletingId = null;
        state.requestError =
          action.payload?.message ?? "Couldn't delete task :(";
      });
  },
});

export const { clearTodoErrors, clearCurrentTodo } = todosSlice.actions;

export default todosSlice.reducer;
