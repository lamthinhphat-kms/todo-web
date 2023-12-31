import {
  Button,
  Card,
  Collapse,
  DatePicker,
  DatePickerProps,
  Input,
  Space,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import TaskItem from "../../components/TaskItem/TaskItem";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TaskService } from "../../api/task";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket/socket";
import { ITask } from "../../models/ITask";
import dayjs from "dayjs";

function ApiScreen() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { userToken } = useContext(AuthContext);
  const { sub } = jwtDecode<{
    sub: number;
  }>(userToken ?? "");

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [dateJS, setDateJS] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("listen", {
        sub,
        socketId: socket.id,
      });
    });

    socket.on("task", (e) => {
      console.log(e);
      setTaskList([...e]);
    });

    socket.connect();

    return () => {
      socket.off("connect");
      socket.off("listen");
      socket.off("disconnect");
      socket.off("task");
      socket.disconnect();
    };
  }, []);

  const onChangeDate: DatePickerProps["onChange"] = (date, dateS) => {
    setDateJS(date);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: TaskService.getTasks,
    onSuccess(data) {
      setTaskList(data);
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: TaskService.createTask,
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["tasks"], { exact: true });
      if (userToken && socket) {
        socket.emit("task", {
          userId: sub,
        });
        setText("");
      }
    },
  });

  const handleSubmit = () => {
    createTaskMutation.mutate({
      title: text,
      deadline: dateJS?.toISOString(),
    });
    setDateJS(null);
  };

  return (
    <div className="container-api">
      <div
        style={{
          padding: "2rem",
          flex: 1,
        }}
      >
        <div className="search-container">
          <Input
            placeholder="Write a task"
            value={text}
            className="input"
            size="large"
            onPressEnter={handleSubmit}
            onChange={(e) => setText(e.target.value)}
          />
          <DatePicker
            onChange={onChangeDate}
            format={"DD/MM/YYYY"}
            value={dateJS}
            disabledDate={(current) => {
              return current && current < dayjs().endOf("day");
            }}
          />

          <Button size="large" type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </div>

        <div className="task-container">
          <Card title="Task not completed" className="container-task-list">
            {isLoading ? (
              <div></div>
            ) : (
              <>
                {taskList!
                  .filter((task, index) => task.isCompleted === false)
                  .sort((a, b) => {
                    return (
                      new Date(a.updatedAt ?? Date.now()).getTime() -
                      new Date(b.updatedAt ?? Date.now()).getTime()
                    );
                  })
                  .map((item, index) => (
                    <TaskItem
                      key={item.id}
                      task={item}
                      socket={socket}
                      userId={sub}
                    />
                  ))}
              </>
            )}
          </Card>
          <Card title="Task completed" className="container-task-list">
            {isLoading ? (
              <div></div>
            ) : (
              <>
                {taskList!
                  .filter((task, index) => task.isCompleted === true)
                  .sort((a, b) => {
                    return (
                      new Date(a.updatedAt ?? Date.now()).getTime() -
                      new Date(b.updatedAt ?? Date.now()).getTime()
                    );
                  })
                  .map((item, index) => (
                    <TaskItem
                      key={item.id}
                      task={item}
                      socket={socket}
                      userId={sub}
                    />
                  ))}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ApiScreen;
