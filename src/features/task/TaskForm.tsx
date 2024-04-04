import React from "react";
import { CreateTask, Task } from "../../types";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

type Props = {
  task: Task | CreateTask;
};

const TaskForm = ({ task }: Props) => {
  const [newTask, setNewTask] = React.useState<Task | CreateTask>(task);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ("id" in task) {
      console.log("edit");
    } else {
      console.log("create");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3" controlId="name">
        <FormLabel>Name</FormLabel>
        <FormControl
          type="name"
          name="name"
          placeholder="Write some name for the task"
          value={newTask.name}
          onChange={(e) => {
            setNewTask({ ...newTask, name: e.target.value });
          }}
        />
        {error && (
          <FormText className="text-muted">name field is required</FormText>
        )}
      </FormGroup>

      <FormGroup className="mb-3" controlId="description">
        <FormLabel>Description</FormLabel>
        <FormControl
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
        {error && (
          <FormText className="text-muted">
            description field is required
          </FormText>
        )}
      </FormGroup>

      <FormGroup className="mb-3" controlId="author">
        <FormLabel>Author</FormLabel>
        <FormControl
          type="text"
          name="author"
          placeholder="Enter your name"
          value={newTask.author}
          onChange={(e) => {
            setNewTask({ ...newTask, author: e.target.value });
          }}
        />
        {error && (
          <FormText className="text-muted">author field is required</FormText>
        )}
      </FormGroup>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TaskForm;
