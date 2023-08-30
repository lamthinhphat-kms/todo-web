import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { produce } from "immer";
import { ITask } from "../models/ITask";
import localStorageUtils from "../utils/LocalStorage";

interface TaskState {
  taskList: ITask[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  addTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
  removeTask: (task: ITask) => void;
  updateTaskList: (taskList: ITask[]) => void;
}

export const store = createWithEqualityFn<TaskState>()(
  (set) => ({
    taskList: [],
    isLoading: false,
    setIsLoading: (isLoading) =>
      set(
        produce((state: TaskState) => {
          state.isLoading = isLoading;
        })
      ),
    addTask: (task) => {
      set(
        produce((state: TaskState) => {
          state.taskList.push(task);
        })
      );
    },
    editTask: (task) =>
      set(
        produce((state: TaskState) => {
          state.taskList = state.taskList.map((item) =>
            item.id === task.id ? task : item
          );
        })
      ),
    removeTask: (task) =>
      set(
        produce((state: TaskState) => {
          state.taskList = state.taskList.filter((item) => item.id !== task.id);
        })
      ),
    updateTaskList: (newTaskList) => {
      set((state: TaskState) => ({
        taskList: [...newTaskList],
      }));
    },
  }),
  shallow
);
