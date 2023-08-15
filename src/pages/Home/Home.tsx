import React, { useState } from "react";
import { store } from "../../zustand/store";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../../models/ITask";
import InputField from "./components/InputField";
import InputList from "./components/InputList";

function HomeScreen() {
  const [task, setTask] = useState<string>("");
  const addTask = store((store) => store.addTask);

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
