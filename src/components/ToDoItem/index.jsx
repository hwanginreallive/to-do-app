import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, List, Popconfirm, Switch, Tag, Tooltip } from "antd";
import React from "react";

const ToDoItem = ({ todo, onTodoRemoval, onTodoToggle }) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={
            todo?.status === 1 ? "Mark as Incomplete" : "Mark as Completed"
          }
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(value) => {
              onTodoToggle({ ...todo, status: value ? 1 : 0 });
            }}
            defaultChecked={todo.status === 1}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? "cyan" : "red"} className="todo-tag">
          {todo.name}
        </Tag>
      </div>
    </List.Item>
  );
};

export default ToDoItem;
