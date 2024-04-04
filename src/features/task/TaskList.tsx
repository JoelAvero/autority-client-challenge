import React from "react";
import { Stack } from "react-bootstrap";
import { Task } from "../../types";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
};

const TaskList = ({ tasks }: Props) => {
  return (
    <Stack gap={3}>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Stack>
  );
};

export default TaskList;
