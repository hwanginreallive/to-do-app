import { List } from "antd";
import React from "react";
import ToDoItem from "../ToDoItem";
const ListToDo = ({ listData, onTodoRemoval, onTodoToggle }) => {
  return (
    <List
      dataSource={listData}
      renderItem={(todo) => (
        <ToDoItem
          todo={todo}
          onTodoToggle={onTodoToggle}
          onTodoRemoval={onTodoRemoval}
        />
      )}
      //   pagination={{
      //     position: "bottom",
      //     pageSize: 10,
      //   }}
      style={{
        maxHeight: 300,
        overflow: "auto",
        padding: 24,
      }}
    />
  );
};

export default ListToDo;
