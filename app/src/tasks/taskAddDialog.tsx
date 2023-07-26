"use client";

import { useState } from "react";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusSquare, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ITask } from "@/app/models/task";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

interface TaskAddDialogProps {
  getTasks: Function;
}

const TaskAddDialog: React.FC<TaskAddDialogProps> = ({ getTasks }) => {
  const [dueDate, setDueDate] = useState<Date | undefined>(
    moment().startOf("day").toDate()
  );
  const api = useAxios();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      dueDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
      category: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (dueDate) {
        values.dueDate = new Date(dueDate!).toISOString();
      } else {
        values.dueDate = moment().startOf("day").toISOString();
      }

      const newTask: ITask = {
        title: values.title,
        category: values.category,
        description: values.description,
        dueDate: values.dueDate,
      };

      api
        .post("Task/", newTask)
        .then(() => {
          toast.success("New task added successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          getTasks();
        })
        .catch((err: any) => {
          toast.error(err.response?.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });

      formik.resetForm();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-lg">
          <PlusSquare className="mr-2 h-4 w-4" /> Add new task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                name="title"
                type="text"
                className="col-span-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <>
                  <span className="col-span-1"></span>
                  <div className="col-span-3 text-red-600 mb-0">
                    <small>{formik.errors.title}</small>
                  </div>
                </>
              ) : null}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="category">Category*</Label>
              <Input
                id="category"
                name="category"
                type="text"
                className="col-span-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <>
                  <span className="col-span-1"></span>
                  <div className="col-span-3 text-red-600">
                    <small>{formik.errors.category}</small>
                  </div>
                </>
              ) : null}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Add some description (optional)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild className="col-span-3">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) => {
                      setDueDate(addDays(new Date(), parseInt(value)));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <>
                <span className="col-span-1"></span>
                <div className="col-span-3 text-lime-700">
                  <small>Empty Due Date field will set to current day</small>
                </div>
              </>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={
                  formik.values.title && formik.values.category ? false : true
                }
              >
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAddDialog;
