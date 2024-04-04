import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  fetchTaskAsync,
  selectTask,
  selectTasksStatus,
} from "../../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Task } from "../../types";
import Link from "next/link";
import Form from "../../features/task/TaskForm";

type Props = {
  id: string;
};

const index = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  // const [task, setTask] = useState<Task | undefined>(undefined);

  const status = useAppSelector(selectTasksStatus);
  const taskFromStore = useAppSelector(selectTask);

  useEffect(() => {
    if (taskFromStore === undefined && id && typeof id === "string") {
      dispatch(fetchTaskAsync(id));
    }
  }, [dispatch, router]);

  // useEffect(() => {
  //   setTask(taskFromStore);
  // }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar las tareas</div>;
  }

  return (
    <>
      {taskFromStore && (
        <div>
          <Link href="/">Home</Link>
          <Form task={taskFromStore} />
        </div>
      )}
    </>
  );
};

export default index;
