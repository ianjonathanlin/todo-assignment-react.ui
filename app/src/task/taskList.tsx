"use client";

import { ITask } from "../../models/task";
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskEditDialog from "./taskEditDialog";
import TaskDeleteDialog from "./taskDeleteDialog";

interface TaskListProps {
  tasks: ITask[];
  setLoading: Function;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setLoading }) => {
  return (
    <>
      {tasks.length > 0 ? (
        <Accordion type="single" collapsible>
          {tasks.map((task) => {
            return (
              <AccordionItem key={task.id!} value={task.id!.toString()}>
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
                      <TaskEditDialog task={task} setLoading={setLoading} />
                      <span className="ps-2"></span>
                      <TaskDeleteDialog task={task} setLoading={setLoading} />
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
        <div className="text-center">No todos found!</div>
      )}
    </>
  );
};

export default TaskList;
