import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Todo } from "../../types";
import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  updateTodo,
} from "./todoAPI";

export interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
};

export const fetchTodosAsync = createAsyncThunk(
  "todo/fetchTodos",
  async (): Promise<Todo[]> => {
    const response = await fetchTodos();
    return response;
  }
);

export const fetchTodoAsync = createAsyncThunk(
  "todo/fetchTodo",
  async (id: string) => {
    const response = await fetchTodo(id);
    return response;
  }
);

export const createTodoAsync = createAsyncThunk(
  "todo/createTodo",
  async (todo: Todo) => {
    const response = await createTodo(todo);
    return response;
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todo: Todo) => {
    const response = await updateTodo(todo);
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string) => {
    await deleteTodo(id);
    return id;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
