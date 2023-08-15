import React, { PropsWithChildren } from "react";
import "./styles.css";
import SingleTask from "./SingleTask";
import { store } from "../../../zustand/store";

type InputListProps = PropsWithChildren<{}>;

function InputList(props: InputListProps) {
  const taskList = store((store) => store.taskList);
  return (
    <div className="task_list">
      {taskList.map((item) => {
        return <SingleTask task={item} />;
      })}
    </div>
  );
}

export default InputList;
