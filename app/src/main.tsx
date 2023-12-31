import { useEffect, useState, useContext, useReducer } from "react";
import { AuthContext } from "./contexts/AuthContext";
import TaskList from "./tasks/taskList";
import TaskAddDialog from "./tasks/taskAddDialog";
import TaskSortReducer from "./reducers/taskSortReducer";
import { ITask } from "../models/task";
import Spinner from "@/lib/Spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "./hooks/useAxios";
import { toast } from "react-toastify";
import moment from "moment";

export default function Main() {
  const initialState = { tasks: [], sortedType: "" };

  const [loading, setLoading] = useState<Boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isLogin] = useContext(AuthContext);
  const [sortFilter, setSortFilter] = useState<string>("sortTasksByDefault");
  const [toggleTodaysTasks, setToggleTodaysTasks] = useState(false);
  const [state, dispatch] = useReducer(TaskSortReducer, initialState);
  const api = useAxios();

  useEffect(() => {
    if (isLogin) getTasks();
  }, [isLogin]);

  const getTasks = () => {
    setLoading(true);
    setSearchFilter("");
    setToggleTodaysTasks(false);
    // timeout to show the spinner
    setTimeout(() => {
      api
        .get("Task/")
        .then((res: any) => {
          dispatch({ type: "sortTasksByDefault", tasks: res.data });
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
          toast.error(err.response?.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }, 1000);
  };

  const sortTasks = (sortType: string) => {
    setSortFilter(sortType);
    dispatch({ type: sortType, tasks: state.tasks });
  };

  const filterTodaysTasks = () => {
    setToggleTodaysTasks(!toggleTodaysTasks);

    if (!toggleTodaysTasks) {
      const todayTasks = state.tasks.filter((task: ITask) => {
        if (moment(task.dueDate).isSame(moment(), "date")) return task;
      });
      state.tasks = todayTasks;
    } else if (toggleTodaysTasks) {
      getTasks();
    }
  };

  let tasksFiltered = state.tasks.filter((task: ITask) => {
    return (
      searchFilter.length === 0 ||
      task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.category.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <>
      {isLogin ? (
        <div className="content-center container">
          <div className="flex justify-between mt-6 pb-4">
            <div className="flex w-3/4 items-center space-x-2">
              <Input
                type="text"
                className="max-w-sm"
                placeholder="Search title or category"
                value={searchFilter}
                onChange={(event) => {
                  setSearchFilter(event.target.value);
                }}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort Tasks By:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sortFilter}
                    onValueChange={(event) => sortTasks(event)}
                  >
                    <DropdownMenuRadioItem value="sortTasksByDefault">
                      Default
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sortTasksByTitle">
                      Title
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sortTasksByCategory">
                      Category
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sortTasksByDueDateAsc">
                      Due Date (Ascending)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sortTasksByDueDateDesc">
                      Due Date (Descending)
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center space-x-2 pl-3">
                <Checkbox
                  id="toggleToday"
                  checked={toggleTodaysTasks}
                  onCheckedChange={filterTodaysTasks}
                />
                <label
                  htmlFor="toggleToday"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Today&apos;s tasks
                </label>
              </div>
            </div>
            <TaskAddDialog getTasks={getTasks} />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <TaskList tasks={tasksFiltered} getTasks={getTasks} />
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
