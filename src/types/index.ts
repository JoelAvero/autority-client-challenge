export type Task = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreateTask = {
  name: string;
  description: string;
  author: string;
};

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  task: Task | undefined;
  deleteStatus: "idle" | "loading" | "failed";
  updateStatus: "idle" | "loading" | "failed";
  createStatus: "idle" | "loading" | "failed";
}
