import React, { useEffect, useState } from "react";
import { store } from "../../zustand/store";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../../models/ITask";
import InputField from "./components/InputField";
import InputList from "./components/InputList";
import NavBar from "../../components/NavBar/NavBar";
import localStorageUtils from "../../utils/LocalStorage";

function HomeScreen() {
  const [task, setTask] = useState<string>("");
  const addTask = store((store) => store.addTask);

  const taskList = store((store) => store.taskList);
  const { updateTaskList } = store((store) => store);

  useEffect(() => {
    try {
      const tempList = JSON.parse(
        localStorageUtils.getFromLocal("taskList") ?? ""
      );
      if (tempList.length !== 0) {
        updateTaskList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorageUtils.saveToLocal("taskList", JSON.stringify(taskList));
  }, [taskList]);
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ITask = {
      id: uuidv4(),
      title: task,
      isCompleted: false,
    };
    addTask(newTask);
    setTask("");
  };

  return (
    <div className="App">
      <span className="heading">Task</span>
      <InputField task={task} setTaskList={setTask} handleAdd={handleAddTask} />
      <InputList />
    </div>
  );
}

export default HomeScreen;
