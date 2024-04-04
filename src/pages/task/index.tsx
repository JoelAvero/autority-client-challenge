import Link from "next/link";
import React from "react";
import { CreateTask } from "../../types";
import Form from "../../features/task/TaskForm";

type Props = {};

const index = (props: Props) => {
  const task: CreateTask = {
    name: "",
    description: "",
    author: "",
  };

  return (
    <div>
      <h1>task creation</h1>
      <Form task={task} />
      <Link href="/">Home</Link>
    </div>
  );
};

export default index;
