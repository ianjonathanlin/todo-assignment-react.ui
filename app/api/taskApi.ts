import { apiUrl, handleResponse, handleError } from "./apiUtils";
import { ITask } from "../models/task";

const baseUrl = apiUrl + "Task/";

export function getTasks() {
  return fetch(baseUrl, { method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export function addTask(task: ITask) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  }).catch(handleError);
}

export function editTask(task: ITask) {
  return fetch(baseUrl + task.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  }).catch(handleError);
}

export function deleteTask(taskId: number) {
  return fetch(baseUrl + taskId, { method: "DELETE" }).catch(handleError);
}
