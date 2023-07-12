"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Task } from "../../models/task";
import moment from "moment";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <>
      {tasks.length > 0 ? (
        <Accordion type="single" collapsible>
          {tasks.map((task) => {
            return (
              <AccordionItem key={task.id} value={task.id.toString()}>
                <AccordionTrigger>
                  <span
                    style={{ fontWeight: "bold" }}
                    className={
                      moment().isAfter(moment(task.dueDate))
                        ? "text-red-600 font-weight-bold"
                        : ""
                    }
                  >
                    {task.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p>
                        <b>Due Date:</b>{" "}
                        {moment(task.dueDate).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                      <br />
                      <p>
                        <b>Category:</b> {task.category}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="default" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <span className="ps-2"></span>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <br />

                  <p>{task.description}</p>

                  <br />

                  <p>
                    <small>
                      <i>
                        Created On:{" "}
                        {moment(task.created).format("MMMM Do YYYY, h:mm:ss a")}
                      </i>
                      <br />
                      <i>
                        Latest Update:{" "}
                        {moment(task.updated).format("MMMM Do YYYY, h:mm:ss a")}
                      </i>
                    </small>
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div>No todos here!</div>
      )}
    </>
  );
};

export default TaskList;
