import React from "react";
import { Button, Container, FormCheck } from "react-bootstrap";
import { Task } from "../../types";
import styles from "./task.module.scss";
import dateFormatter from "../../utils/dateFormatter";
import { GrEdit, GrTrash } from "react-icons/gr";
import Link from "next/link";
import { addTask, deleteTaskAsync } from "./taskSlice";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Container
      className={`${styles.card} ${task.isComplete ? styles.is_completed : ""}`}
    >
      <div className={styles.card__left}>
        <FormCheck
          className={styles.checkbox}
          defaultChecked={task.isComplete}
        />
      </div>

      <div className={styles.card__middle}>
        <div className={styles.card__header}>
          <div className={styles.card__header__name}>{task.name}</div>
          <div className={styles.card__header__info}>
            <div className={styles.card__header__info__author}>
              by: {task.author}
            </div>
            <div className="card__header__info__creation-date">
              {dateFormatter(task.createdAt)}
            </div>
          </div>
        </div>

        <div className={styles.card__body}>{task.description}</div>
      </div>

      <div className={styles.card__right}>
        <Link href={`/task/${task.id}`}>
          <Button
            onClick={() => dispatch(addTask(task))}
            variant="warning"
            className={styles.card__right__edit}
          >
            <GrEdit className={styles.card__right__icons} />
          </Button>
        </Link>
        <Button
          variant="danger"
          className={styles.card__right__delete}
          onClick={() => dispatch(deleteTaskAsync(task.id))}
        >
          <GrTrash className={styles.card__right__icons} />
        </Button>
      </div>
    </Container>
  );
};

export default TaskCard;
