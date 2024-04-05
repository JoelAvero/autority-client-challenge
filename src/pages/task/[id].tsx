import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  fetchTaskAsync,
  selectTask,
  selectTasksStatus,
} from "../../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Link from "next/link";
import { Container, Spinner } from "react-bootstrap";
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
    return <Spinner animation="border" />;
  }

  const errorView = (
    <div>
      Error when fetching task, did you start the server? is the id valid?
    </div>
  );

  const content = taskFromStore ? <TaskForm task={taskFromStore} /> : errorView;

  return (
    <Container className={styles.task__container}>
      <Link className={styles.task__link} href="/">
        <Button variant="dark">BACK TO TASKS</Button>
      </Link>
      {status === "failed" ? errorView : content}
    </Container>
  );
};

export default index;
