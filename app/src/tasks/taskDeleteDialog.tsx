"use client";

import { ITask } from "@/app/models/task";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

interface TaskDeleteDialogProps {
  task: ITask;
  getTasks: Function;
}

const TaskDeleteDialog: React.FC<TaskDeleteDialogProps> = ({
  task,
  getTasks,
}) => {
  const api = useAxios();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Confirm deletion of task?
            <br />
            <br />
            Title: <b>{task.title}</b>
            <br />
            Category: <b>{task.category}</b>
            <br />
            Due Date: <b>{moment(task.dueDate).format("D/MM/YYYY")}</b>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="submit"
              onClick={() => {
                api
                  .delete(`Task/${task.id}`)
                  .then(() => {
                    toast.success("Task deleted successfully!", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    getTasks();
                  })
                  .catch((err: any) => {
                    toast.error(err.response?.data, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  });
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteDialog;
