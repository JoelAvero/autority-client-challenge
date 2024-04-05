import React, { useEffect, useState } from "react";
import { Button, Container, FormCheck } from "react-bootstrap";
import { Task } from "../../types";
import styles from "./task.module.scss";
import dateFormatter from "../../utils/dateFormatter";
import { GrEdit, GrTrash } from "react-icons/gr";
import Link from "next/link";
import {
  addTask,
  deleteTaskAsync,
  selectDeleteStatus,
  selectUpdateStatus,
  updateTaskStatusAsync,
} from "./taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector(selectUpdateStatus);
  const deleteStatus = useAppSelector(selectDeleteStatus);

  const [errors, setErrors] = useState({
    updateError: false,
    deleteError: false,
  });
  const [checked, setChecked] = useState(task.isComplete);

  const handleIsCompleteChange = () => {
    const taskToUpdate = { ...task, isComplete: !task.isComplete };
    dispatch(updateTaskStatusAsync(taskToUpdate));
    setChecked(!checked);
  };

  useEffect(() => {
    if (updateStatus === "failed") {
      setErrors((prev) => ({ ...prev, updateError: !prev.updateError }));
    }
    if (deleteStatus === "failed") {
      setErrors((prev) => ({ ...prev, deleteError: !prev.deleteError }));
    }

    setTimeout(() => {
      if (updateStatus === "failed") {
        setChecked(task.isComplete);
      }
      setErrors({ updateError: false, deleteError: false });
    }, 3000);
  }, [updateStatus, deleteStatus]);

  return (
    <Container
      className={`${styles.card} ${task.isComplete ? styles.is_completed : ""}`}
    >
      <div className={styles.card__left}>
        <FormCheck
          className={styles.checkbox}
          disabled={errors.updateError}
          checked={checked}
          onChange={handleIsCompleteChange}
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
        {task.isComplete ? (
          <Button
            disabled
            onClick={() => dispatch(addTask(task))}
            variant="warning"
            className={styles.card__right__edit}
          >
            <GrEdit className={styles.card__right__icons} />
          </Button>
        ) : (
          <Link href={`/task/${task.id}`}>
            <Button
              onClick={() => dispatch(addTask(task))}
              variant="warning"
              className={styles.card__right__edit}
            >
              <GrEdit className={styles.card__right__icons} />
            </Button>
          </Link>
        )}

        <Button
          variant="danger"
          className={`${styles.card__right__delete} ${
            errors.deleteError ? styles.card__right__delete__fail : ""
          }`}
          disabled={errors.deleteError}
          onClick={() => dispatch(deleteTaskAsync(task.id))}
        >
          <GrTrash className={styles.card__right__icons} />
        </Button>
      </div>
    </Container>
  );
};

export default TaskCard;
