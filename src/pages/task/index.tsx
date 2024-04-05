import Link from "next/link";
import React from "react";
import { CreateTask } from "../../types";
import Form from "../../features/task/TaskForm";
import { Container } from "react-bootstrap";
import styles from "../../styles/Create.module.scss";
import Button from "../../components/Button";

type Props = {};

const index = (props: Props) => {
  const task: CreateTask = {
    name: "",
    description: "",
    author: "",
  };

  return (
    <Container className={styles.create__container}>
      <Link className={styles.create__link} href="/">
        <Button variant="dark">BACK TO TASKS</Button>
      </Link>
      <Form task={task} />
    </Container>
  );
};

export default index;
