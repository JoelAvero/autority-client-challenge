import { Task } from "../../types";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("http://localhost:4000/tasks");
  const tasks = await response.json();

  return tasks.data;
}

export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(`http://localhost:4000/tasks/${id}`);
  const task = await response.json();

  return task.data;
}

export async function createTask(task: Task): Promise<Task> {
  const response = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const newTask = await response.json();
  return newTask.data;
}

export async function updateTask(task: Task): Promise<string> {
  const response = await fetch(`/api/task/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const updatedTask = await response.json();
  return updatedTask.data;
}

export async function deleteTask(id: number): Promise<string> {
  const response = await fetch(`http://localhost:4000/tasks/${id}`, {
    method: "DELETE",
  });
  const deletedTask = await response.json();
  return deletedTask.data;
}
