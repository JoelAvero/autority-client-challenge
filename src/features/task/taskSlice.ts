import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CreateTask, Task, TaskState } from "../../types";
import {
  createTask,
  deleteTask,
  fetchTask,
  fetchTasks,
  updateTask,
} from "./taskAPI";
import { AppState } from "../../app/store";

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  task: undefined,
  deleteStatus: "idle",
  updateStatus: "idle",
  createStatus: "idle",
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

export const createTaskAsync = createAsyncThunk(
  "task/createTask",
  async (task: CreateTask) => {
    const response = await createTask(task);
    return response;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTask",
  async (task: Task) => {
    const response = await updateTask(task);
    return response;
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "task/updateTaskStatus",
  async (task: Task) => {
    const response = await updateTask(task);
    return response;
  }
);

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
      .addCase(updateTaskAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTaskAsync.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.updateStatus = "idle";
      })
      .addCase(updateTaskStatusAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTaskStatusAsync.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        state.updateStatus = "idle";
        state.tasks = state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isComplete: !task.isComplete };
          }
          return task;
        });
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTaskAsync.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.createStatus = "idle";
      })
      .addCase(createTaskAsync.rejected, (state) => {
        state.createStatus = "failed";
      });
  },
});

export const { addTask } = taskSlice.actions;

export const selectTasks = (state: AppState): Task[] => {
  return state.task.tasks.slice().sort((task1, task2) => {
    if (task1.isComplete !== task2.isComplete) {
      return task1.isComplete ? 1 : -1;
    }

    return (
      new Date(task2.updatedAt).getTime() - new Date(task1.updatedAt).getTime()
    );
  });
};
export const selectTask = (state: AppState): Task | undefined =>
  state.task.task;
export const selectTasksStatus = (state: AppState): string => state.task.status;
export const selectUpdateStatus = (state: AppState): string =>
  state.task.updateStatus;
export const selectDeleteStatus = (state: AppState): string =>
  state.task.deleteStatus;
export const selectCreateStatus = (state: AppState): string =>
  state.task.createStatus;

export default taskSlice.reducer;
