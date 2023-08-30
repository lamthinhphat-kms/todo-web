import React, { PropsWithChildren, useEffect } from "react";
import "./styles.css";
import SingleTask from "./SingleTask";
import { store } from "../../../zustand/store";
import localStorageUtils from "../../../utils/LocalStorage";

type InputListProps = PropsWithChildren<{}>;

function InputList(props: InputListProps) {
  const taskList = store((store) => store.taskList);

  return (
    <div className="task_list">
      {taskList.map((item) => {
        return <SingleTask key={item.id} task={item} />;
      })}
    </div>
  );
}

export default InputList;
