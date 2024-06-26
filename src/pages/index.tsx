import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  fetchTasksAsync,
  selectTaskUpdated,
  selectTasks,
  selectTasksStatus,
  setTaskUpdated,
} from "../features/task/taskSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TaskList from "../features/task/TaskList";
import { Container, Spinner } from "react-bootstrap";
import Button from "../components/Button";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectTasksStatus);
  const tasksFromStore = useAppSelector(selectTasks);
  const taskUpdated = useAppSelector(selectTaskUpdated);

  useEffect(() => {
    if (tasksFromStore.length === 0 || taskUpdated) {
      dispatch(fetchTasksAsync());
      dispatch(setTaskUpdated(false));
    }
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner animation="border" />;
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.header}>Tasks App</h1>
      <section className={styles.main__section}>
        {status === "failed" ? (
          <div>Error when loading tasks, did you start the server?</div>
        ) : (
          <>
            <Link href="/task">
              <Button variant="primary">CREATE TASK</Button>
            </Link>
            {tasksFromStore.length ? (
              <>
                <TaskList tasks={tasksFromStore} />
              </>
            ) : (
              <p>No tasks yet</p>
            )}
          </>
        )}
      </section>
    </Container>
  );
};

export default IndexPage;
