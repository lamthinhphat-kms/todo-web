import axios from "axios";
import { ITask } from "../models/ITask";

async function getTasks(): Promise<ITask[]> {
  try {
    console.log("getTask");
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createTask({ title }: { title: string }): Promise<ITask[]> {
  try {
    const response = await axios.post("/tasks", {
      title,
      isCompleted: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function updateTask({
  id,
  title,
  isCompleted,
}: {
  id: string;
  title: string;
  isCompleted: boolean;
}): Promise<ITask> {
  try {
    const response = await axios.put(`/tasks/${id}`, {
      id: id,
      title: title,
      isCompleted: isCompleted,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteTask({ id }: { id: string }): Promise<void> {
  try {
    await axios.delete(`/tasks/${id}`);
  } catch (error) {
    throw error;
  }
}
export const TaskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
