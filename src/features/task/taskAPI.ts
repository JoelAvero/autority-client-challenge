import { CreateTask, Task } from "../../types";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
  const tasks = await response.json();

  if (tasks.error) {
    return Promise.reject(tasks.message);
  }

  return tasks.data;
}

export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`
  );
  const task = await response.json();

  if (task.error) {
    return Promise.reject(task.message);
  }

  return task.data;
}

export async function createTask(task: CreateTask): Promise<Task> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const newTask = await response.json();

  if (newTask.error) {
    return Promise.reject(newTask.message);
  }

  return newTask.data;
}

export async function updateTask(task: Task): Promise<number> {
  const { id } = task;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const updatedTask = await response.json();

  if (updatedTask.error) {
    return Promise.reject(updatedTask.message);
  }
  return id;
}

export async function deleteTask(id: number): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
  const deletedTask = await response.json();

  if (deletedTask.error) {
    return Promise.reject(deletedTask.message);
  }
  return deletedTask.data;
}
