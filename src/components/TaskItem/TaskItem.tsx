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
const { Text, Link, Paragraph } = Typography;

type TaskItemProp = PropsWithChildren<{
  task: ITask;
}>;

function TaskItem(props: TaskItemProp) {
  const [editting, setEditting] = useState(false);
  const [text, setText] = useState(props.task.title);
  const queryClient = useQueryClient();
  let tempText = "";
  const updateTaskMutation = useMutation({
    mutationFn: TaskService.updateTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"], { exact: true });
      setText(tempText);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });

  return (
    <Card className="task-item" key={props.task.id}>
      <Paragraph
        className="text"
        style={{
          margin: 0,
          insetInlineStart: 0,
        }}
        editable={{
          icon: <Icon type="xxx" />,
          text: text,
          editing: editting,
          onChange: (newText) => {
            tempText = newText;
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
        {text}
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