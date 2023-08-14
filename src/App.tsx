import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { ITask } from "./models/ITask";
import { v4 as uuidv4 } from "uuid";
import InputList from "./components/InputList";
import { store } from "./zustand/store";

function App() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<ITask[]>([]);
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

export default App;
