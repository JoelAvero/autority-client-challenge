import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Counter from "../features/counter-reference-redux/Counter";
import {
  addTask,
  fetchTasksAsync,
  selectTasks,
  selectTasksStatus,
} from "../features/task/taskSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TaskList from "../features/task/TaskList";
import { Container, Spinner } from "react-bootstrap";
import Button from "../components/Button";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectTasksStatus);
  const tasksFromStore = useAppSelector(selectTasks);

  useEffect(() => {
    if (tasksFromStore.length === 0) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner animation="border" />;
  }

  if (status === "failed") {
    return <div>Error when loading tasks</div>;
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.header}>Tasks App</h1>
      <section className={styles.main__section}>
        {tasksFromStore.length ? (
          <>
            <Link href="/task">
              <Button variant="primary">CREATE TASK</Button>
            </Link>
            <TaskList tasks={tasksFromStore} />
          </>
        ) : (
          <p>No tasks yet</p>
        )}
      </section>
    </Container>
  );
};

export default IndexPage;
