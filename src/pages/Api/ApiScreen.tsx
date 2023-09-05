import { Button, Card, Collapse, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import "./styles.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import TaskItem from "../../components/TaskItem/TaskItem";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TaskService } from "../../api/task";

function ApiScreen() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: TaskService.getTasks,
    onSuccess(data) {
      console.log(data);
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: TaskService.createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"], { exact: true });
      setText("");
    },
  });

  const handleSubmit = () => {
    createTaskMutation.mutate({
      title: text,
    });
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
                {data!
                  .filter((task, index) => task.isCompleted === false)
                  .map((item, index) => (
                    <TaskItem key={item.id} task={item} />
                  ))}
              </>
            )}
          </Card>
          <Card title="Task completed" className="container-task-list">
            {isLoading ? (
              <div></div>
            ) : (
              <>
                {data!
                  .filter((task, index) => task.isCompleted === true)
                  .map((item, index) => (
                    <TaskItem key={item.id} task={item} />
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
