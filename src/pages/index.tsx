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
import { Task } from "../types";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const status = useAppSelector(selectTasksStatus);
  const tasksFromStore = useAppSelector(selectTasks);

  useEffect(() => {
    if (tasksFromStore.length === 0) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch]);

  useEffect(() => {
    setTasks(tasksFromStore);
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar las tareas</div>;
  }

  return (
    <>
      {tasks.length && (
        <div className={styles.container}>
          <Head>
            <title>Autority Challenge</title>
          </Head>
          <header className={styles.header}>
            {tasks.map((task) => (
              <Link
                href={`/task/${task.id}`}
                key={task.id}
                onClick={() => {
                  dispatch(addTask(task));
                }}
              >
                {task.name}
              </Link>
            ))}
            <Link href="/task">task</Link>
          </header>
          <div>
            <Counter />
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;
