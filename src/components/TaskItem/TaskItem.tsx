import { Card, Typography } from "antd";
import React, { PropsWithChildren, useEffect, useState } from "react";
import "./styles.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import Icon from "@ant-design/icons";
import { ITask } from "../../models/ITask";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { TaskService } from "../../api/task";
import Item from "antd/es/list/Item";
import { Socket } from "socket.io-client";
const { Text, Link, Paragraph } = Typography;

type TaskItemProp = PropsWithChildren<{
  task: ITask;
  socket: Socket;
  userId: number;
}>;

function TaskItem(props: TaskItemProp) {
  const { userId, socket } = props;
  const [editting, setEditting] = useState(false);
  const queryClient = useQueryClient();
  let tempText = "";
  const updateTaskMutation = useMutation({
    mutationFn: TaskService.updateTask,
    onSuccess: (data) => {
      if (userId && socket) {
        socket.emit("task", {
          userId: userId,
        });
      }
      // queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: (data) => {
      if (userId && socket) {
        socket.emit("task", {
          userId: userId,
        });
      }
      // queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });

  return (
    <Card className="task-item">
      <Paragraph
        className="text"
        style={{
          margin: 0,
          insetInlineStart: 0,
        }}
        editable={{
          icon: <Icon type="xxx" />,
          text: props.task.title,
          editing: editting,
          onChange: (newText) => {
            updateTaskMutation.mutate({
              id: props.task.id,
              title: newText,
              isCompleted: props.task.isCompleted,
            });
          },
          onEnd: () => {
            setEditting(!editting);
          },
        }}
      >
        {props.task.title}
      </Paragraph>

      <div>
        <span
          className="icon"
          onClick={() => {
            setEditting(!editting);
          }}
        >
          <AiFillEdit />
        </span>
        {!editting && (
          <span
            className="icon"
            onClick={() => {
              updateTaskMutation.mutate({
                id: props.task.id,
                title: props.task.title,
                isCompleted: !props.task.isCompleted,
              });
            }}
          >
            <MdDone />
          </span>
        )}
        {!editting && (
          <span
            className="icon"
            onClick={() => {
              deleteTaskMutation.mutate({
                id: props.task.id,
              });
            }}
          >
            <AiFillDelete />
          </span>
        )}
      </div>
    </Card>
  );
}

export default TaskItem;
