import { ITask } from "../../models/task";

interface taskSortReducerState {
  tasks: ITask[];
  sortedType: string;
}

interface taskSortReducerAction {
  type: string;
  tasks: ITask[];
}

export default function TaskSortReducer(
  state: taskSortReducerState,
  action: taskSortReducerAction
) {
  switch (action.type) {
    case "sortTasksByDefault":
      const sortedTasksById = action.tasks.sort(function (a: ITask, b: ITask) {
        return a.id! - b.id!;
      });
      return {
        ...state,
        tasks: sortedTasksById,
        sortedType: "sortTasksById",
      };
    case "sortTasksByTitle":
      const sortedTasksByTitle = action.tasks.sort(function (
        a: ITask,
        b: ITask
      ) {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        tasks: sortedTasksByTitle,
        sortedType: "sortTasksByTitle",
      };
    case "sortTasksByCategory":
      const sortedTasksByCategory = action.tasks.sort(function (
        a: ITask,
        b: ITask
      ) {
        let x = a.category.toLowerCase();
        let y = b.category.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        tasks: sortedTasksByCategory,
        sortedType: "sortTasksByCategory",
      };
    case "sortTasksByDueDateAsc":
      const sortedTasksByDueDateAsc = action.tasks.sort(function (
        a: ITask,
        b: ITask
      ) {
        return a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
      });
      return {
        ...state,
        tasks: sortedTasksByDueDateAsc,
        sortedType: "sortTasksByDueDateAsc",
      };
    case "sortTasksByDueDateDesc":
      const sortedTasksByDueDateDesc = action.tasks.sort(function (
        a: ITask,
        b: ITask
      ) {
        return a.dueDate > b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
      });
      return {
        ...state,
        tasks: sortedTasksByDueDateDesc,
        sortedType: "sortTasksByDueDateDesc",
      };
    default:
      throw new Error(`Unknown action type - ${action.type}`);
  }
}
