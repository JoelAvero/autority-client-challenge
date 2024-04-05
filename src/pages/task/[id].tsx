import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  fetchTaskAsync,
  selectTask,
  selectTasksStatus,
} from "../../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Link from "next/link";
import { Container } from "react-bootstrap";
import styles from "../../styles/Task.module.scss";
import Button from "../../components/Button";
import TaskForm from "../../features/task/TaskForm";

type Props = {};

const index = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const status = useAppSelector(selectTasksStatus);
  const taskFromStore = useAppSelector(selectTask);

  useEffect(() => {
    if (taskFromStore === undefined && id && typeof id === "string") {
      dispatch(fetchTaskAsync(id));
    }
  }, [dispatch, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar las tareas</div>;
  }

  return (
    <>
      {taskFromStore && (
        <Container className={styles.task__container}>
          <Link className={styles.task__link} href="/">
            <Button variant="dark">BACK TO TASKS</Button>
          </Link>
          <TaskForm task={taskFromStore} />
        </Container>
      )}
    </>
  );
};

export default index;
