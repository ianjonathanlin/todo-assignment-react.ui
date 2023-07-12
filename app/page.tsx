"use client";

import { useEffect, useState } from "react";
import TaskList from "./src/task/taskList";
import { Task } from "./models/task";
import * as taskApi from "./api/taskApi";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);

    taskApi
      .getTasks()
      .then((res) => {
        setTasks(res);
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err);
        setLoading(!loading);
      });
  }, [tasks, loading]);

  return (
    <div className="py-3 content-center container">
      <TaskList tasks={tasks} />
    </div>
  );
}
