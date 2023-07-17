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
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import * as taskApi from "../../api/taskApi";

interface TaskDeleteDialogProps {
  task: ITask;
  setLoading: Function;
}

const TaskDeleteDialog: React.FC<TaskDeleteDialogProps> = ({
  task,
  setLoading,
}) => {
  const { toast } = useToast();

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
            Due Date:{" "}
            <b>{moment(task.dueDate).format("MMMM Do YYYY, h:mm:ss a")}</b>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="submit"
              onClick={() => {
                taskApi
                  .deleteTask(task.id!)
                  .then(() => {
                    toast({
                      description: "Task deleted successfully!",
                    });
                    setLoading(true);
                  })
                  .catch((err: any) => {
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong.",
                      description: err.response?.data,
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
