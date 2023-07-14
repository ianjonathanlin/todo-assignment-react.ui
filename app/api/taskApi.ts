import { apiUrl } from "./env";
import { ITask } from "../models/task";

const axios = require("axios").default;

const baseUrl = apiUrl + "Task/";

export function getTasks() {
  return axios.get(baseUrl);
}

export function addTask(task: ITask) {
  return axios.post(baseUrl, JSON.stringify(task), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function editTask(task: ITask) {
  return axios.put(baseUrl + task.id, JSON.stringify(task), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteTask(taskId: number) {
  return axios.delete(baseUrl + taskId);
}
