import React, { useEffect, useState } from "react";
import { CreateTask, Task } from "../../types";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";
import styles from "./task.module.scss";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createTaskAsync,
  fetchTaskAsync,
  fetchTasksAsync,
  selectCreateStatus,
  selectUpdateStatus,
  updateTaskAsync,
} from "./taskSlice";
import { useRouter } from "next/router";

type Props = {
  task: Task | CreateTask;
};

const TaskForm = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const createStatus = useAppSelector(selectCreateStatus);
  const updateStatus = useAppSelector(selectUpdateStatus);

  const [newTask, setNewTask] = useState<Task | CreateTask>(task);
  const [validated, setValidated] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const actionType = "id" in task ? "EDIT" : "CREATE";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    } else {
      if (actionType === "EDIT") {
        await dispatch(updateTaskAsync(newTask as Task));
        dispatch(fetchTasksAsync());
      } else {
        await dispatch(createTaskAsync(newTask as CreateTask));
      }
      setActionCompleted(true);
    }
  };

  useEffect(() => {
    if (actionCompleted && createStatus === "idle") {
      router.push("/");
    }
  }, [createStatus]);

  useEffect(() => {
    if (actionCompleted && updateStatus === "idle") {
      router.push("/");
    }
  }, [updateStatus]);

  if (createStatus === "failed" || updateStatus === "failed") {
    return <div>Error when {actionType} task, please refresh</div>;
  }

  return (
    <Form
      noValidate
      validated={validated}
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h1 className={styles.form__title}>{actionType} TASK</h1>

      <FormGroup className="mb-3" controlId="name">
        <FormLabel className={styles.form__label}>Name</FormLabel>
        <FormControl
          required
          type="name"
          name="name"
          placeholder="Write some name for the task"
          value={newTask.name}
          onChange={(e) => {
            setNewTask({ ...newTask, name: e.target.value });
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </FormGroup>

      <FormGroup className="" controlId="description">
        <FormLabel className={styles.form__label}>Description</FormLabel>
        <FormControl
          required
          as="textarea"
          name="description"
          rows={3}
          type="text"
          placeholder="Write some description for the task"
          value={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </FormGroup>

      <FormGroup className="" controlId="author">
        <FormLabel className={styles.form__label}>Author</FormLabel>
        <FormControl
          required
          type="text"
          name="author"
          placeholder="Enter your name"
          value={newTask.author}
          onChange={(e) => {
            setNewTask({ ...newTask, author: e.target.value });
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </FormGroup>

      <Button className={styles.form__button} variant="primary" type="submit">
        {actionType}
      </Button>
    </Form>
  );
};

export default TaskForm;
