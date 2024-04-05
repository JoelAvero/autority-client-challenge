import React, { useEffect, useState } from "react";
import { CreateTask, Task } from "../../types";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import styles from "./task.module.scss";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createTaskAsync,
  fetchTasksAsync,
  selectCreateStatus,
  selectUpdateStatus,
  setTaskUpdated,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    } else {
      if (actionType === "EDIT") {
        dispatch(updateTaskAsync(newTask as Task));
      } else {
        dispatch(createTaskAsync(newTask as CreateTask));
      }
      setActionCompleted(true);
    }
  };

  useEffect(() => {
    if (actionCompleted && createStatus === "idle") {
      dispatch(setTaskUpdated(true));
      router.push("/");
    }
  }, [createStatus]);

  useEffect(() => {
    if (actionCompleted && updateStatus === "idle") {
      dispatch(setTaskUpdated(true));
      router.push("/");
    }

    return () => {};
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
          maxLength={30}
          placeholder="Write some name for the task"
          value={newTask.name}
          onChange={(e) => {
            setNewTask({ ...newTask, name: e.target.value });
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Name is required and max length is 30
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          Description is required
        </Form.Control.Feedback>
      </FormGroup>

      <FormGroup className="" controlId="author">
        <FormLabel className={styles.form__label}>Author</FormLabel>
        <FormControl
          required
          type="text"
          name="author"
          placeholder="Enter your name"
          maxLength={30}
          value={newTask.author}
          onChange={(e) => {
            setNewTask({ ...newTask, author: e.target.value });
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Author is required and max length is 30
        </Form.Control.Feedback>
      </FormGroup>

      <Button className={styles.form__button} variant="primary" type="submit">
        {createStatus === "loading" || updateStatus === "loading" ? (
          <Spinner size="sm" animation="border" />
        ) : (
          actionType
        )}
      </Button>
    </Form>
  );
};

export default TaskForm;
