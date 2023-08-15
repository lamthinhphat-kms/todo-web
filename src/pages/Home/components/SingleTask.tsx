import React, { PropsWithChildren, useEffect, useState } from "react";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { store } from "../../../zustand/store";
import { ITask } from "../../../models/ITask";

type SingleTaskProp = PropsWithChildren<{
  task: ITask;
}>;

function SingleTask(props: SingleTaskProp) {
  const editTask = store((store) => store.editTask);
  const removeTask = store((store) => store.removeTask);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [text, setText] = useState(props.task.title);

  useEffect(() => {
    editTask({ ...props.task, title: text });
  }, [isEdit]);

  return (
    <form className="task_single">
      <div className="container_task--text">
        {isEdit ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "95%",
              fontSize: "20px",
            }}
          />
        ) : props.task.isCompleted ? (
          <s className="task_single--text">{props.task.title}</s>
        ) : (
          <span className="task_single--text">{props.task.title}</span>
        )}
      </div>

      <div>
        <span className="icon" onClick={() => setIsEdit(!isEdit)}>
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
