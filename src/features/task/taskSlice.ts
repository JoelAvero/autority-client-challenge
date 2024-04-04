import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Task, TaskState } from "../../types";
import { deleteTask, fetchTask, fetchTasks } from "./taskAPI";
import { AppState } from "../../app/store";

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  task: undefined,
};

export const fetchTasksAsync = createAsyncThunk(
  "task/fetchTasks",
  async (): Promise<Task[]> => {
    const response = await fetchTasks();
    return response;
  }
);

export const fetchTaskAsync = createAsyncThunk(
  "task/fetchTask",
  async (id: string) => {
    const response = await fetchTask(id);
    return response;
  }
);

// export const createTodoAsync = createAsyncThunk(
//   "todo/createTodo",
//   async (todo: Task) => {
//     const response = await createTodo(todo);
//     return response;
//   }
// );

// export const updateTodoAsync = createAsyncThunk(
//   "todo/updateTodo",
//   async (todo: Task) => {
//     const response = await updateTodo(todo);
//     return response;
//   }
// );

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (id: number) => {
    await deleteTask(id);
    return id;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.tasks = action.payload;
      })
      .addCase(fetchTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.task = action.payload;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { addTask } = taskSlice.actions;

export const selectTasks = (state: AppState): Task[] => state.task.tasks;
export const selectTask = (state: AppState): Task | undefined =>
  state.task.task;
export const selectTasksStatus = (state: AppState): string => state.task.status;

export default taskSlice.reducer;
