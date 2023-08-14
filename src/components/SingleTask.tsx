import React, { PropsWithChildren } from "react";
import { ITask } from "../models/ITask";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { store } from "../zustand/store";

type SingleTaskProp = PropsWithChildren<{
  task: ITask;
}>;

function SingleTask(props: SingleTaskProp) {
  const editTask = store((store) => store.editTask);
  const removeTask = store((store) => store.removeTask);

  return (
    <form className="task_single">
      <div className="container_task--text">
        {props.task.isCompleted ? (
          <s className="task_single--text">{props.task.title}</s>
        ) : (
          <span className="task_single--text">{props.task.title}</span>
        )}
      </div>

      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span
          className="icon"
          onClick={() =>
            editTask({
              ...props.task,
              isCompleted: !props.task.isCompleted,
            })
          }
        >
          <MdDone />
        </span>
        <span className="icon" onClick={() => removeTask(props.task)}>
          <AiFillDelete />
        </span>
      </div>
    </form>
  );
}

export default SingleTask;
