import { Todo } from "../../types";

export async function fetchTodos(): Promise<string> {
  return "todos";
}

export async function fetchTodo(id: string): Promise<string> {
  return "todo " + id;
}

export async function createTodo(todo: Todo): Promise<string> {
  return "created";
}

export async function updateTodo(todo: Todo): Promise<string> {
  return "updated";
}

export async function deleteTodo(id: string): Promise<string> {
  return "deleted";
}
