import { apiUrl, handleResponse, handleError } from "./apiUtils";
import { Task } from "../models/task";

const baseUrl = apiUrl + "Task/";

export function getTasks() {
  return fetch(baseUrl, { method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export function addTask(task: Task) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function editTask(task: Task) {
  return fetch(baseUrl + task.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTask(taskId: number) {
  return fetch(baseUrl + taskId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
