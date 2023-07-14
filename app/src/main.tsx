import { useEffect, useState, useMemo, useContext } from "react";
import { UserContext } from "./context/UserContext";
import TaskList from "./task/taskList";
import TaskAddDialog from "./task/taskAddDialog";
import { ITask } from "../models/task";
import * as taskApi from "../api/taskApi";
import Spinner from "@/lib/Spinner";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Main() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const { isLogin, username } = useContext(UserContext);

  const { toast } = useToast();

  useEffect(() => {
    if (isLogin) {
      setLoading(true);
      taskApi
        .getTasks()
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              let err = new Error(text);
              throw err;
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          data.sort(function (a: ITask, b: ITask) {
            return a.id! - b.id!;
          });
          setTasks(data!);
        })
        .catch((err) =>
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: err.message,
          })
        );
    }
    setLoading(false);
  }, [loading, isLogin]);

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
      {isLogin && username != "" ? (
        <div className="content-center container">
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
          {loading ? (
            <Spinner />
          ) : (
            <TaskList tasks={tasksFiltered} setLoading={setLoading} />
          )}
        </div>
      ) : (
        <h1 className="text-lg pt-12 text-center font-semibold">
          Please Login!
        </h1>
      )}
    </>
  );
}
