"use client";

import { useEffect, useState, useMemo } from "react";
import TaskList from "./src/task/taskList";
import { ITask } from "./models/task";
import TaskAddDialog from "./src/task/taskAddDialog";
import * as taskApi from "./api/taskApi";
import Spinner from "@/lib/Spinner";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import Header from "./src/header";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    taskApi
      .getTasks()
      .then((res) => {
        res.sort(function (a: ITask, b: ITask) {
          return a.id! - b.id!;
        });
        setTasks(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [loading]);

  const tasksFiltered = useMemo(
    () =>
      tasks
        .filter((task) => {
          return (
            searchFilter.length === 0 ||
            task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            task.category.toLowerCase().includes(searchFilter.toLowerCase())
          );
        })
        .sort(function (a: ITask, b: ITask) {
          return a.id! - b.id!;
        }),
    [searchFilter, tasks]
  );

  return (
    <>
      <Header />
      <div className="content-center container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between mt-6 pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search title or category"
                  value={searchFilter}
                  onChange={(event) => {
                    setSearchFilter(event.target.value);
                  }}
                />
              </div>
              <TaskAddDialog setLoading={setLoading} />
            </div>
            <TaskList tasks={tasksFiltered} setLoading={setLoading} />
          </>
        )}
      </div>
      <Toaster />
    </>
  );
}
