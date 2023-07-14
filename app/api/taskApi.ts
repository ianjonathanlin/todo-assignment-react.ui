import { apiUrl } from "./env";
import { ITask } from "../models/task";

const baseUrl = apiUrl + "Task/";

export function getTasks() {
  return fetch(baseUrl, { method: "GET" });
}

export function addTask(task: ITask) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function editTask(task: ITask) {
  return fetch(baseUrl + task.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function deleteTask(taskId: number) {
  return fetch(baseUrl + taskId, { method: "DELETE" });
}
