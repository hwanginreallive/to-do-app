import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, notification, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToDo from "../components/AddToTo";
import ListToDo from "../components/ListTodos";

function ToDo() {
  const [listData, setListData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterSelected, setFilterSelected] = useState("2");

  const handleGetData = async (params) => {
    const newParam =
      params &&
      Object.fromEntries(
        Object.entries(params).filter(([, value]) => value?.length > 0)
      );

    const queryString = newParam
      ? new URLSearchParams(newParam).toString()
      : "";

    const res = await axios.get(`/api/todos?${queryString}`);

    if (res.status === 200) {
      setListData(res.data);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateTodo = async (data, form) => {
    const res = await axios.post("/api/todo", data);

    if (res.status === 200 || res.status === 201) {
      notification.success({ message: "Created successfully." });
      handleCancel();
      form.resetFields();
      handleGetData();
    } else notification.error({ message: "Created fail." });
  };

  const handleRemoveTodo = async (data) => {
    const res = await axios.delete(`/api/todo/${data.id}`);

    if (res.status === 200 || res.status === 201) {
      notification.success({ message: "Deleted successfully." });
      handleGetData();
    } else notification.error({ message: "Deleted fail." });
  };

  const handleToggleTodoStatus = async (data) => {
    const res = await axios.patch(`/api/todo/${data.id}`, data);

    if (res.status === 200 || res.status === 201) {
      notification.success({ message: "Updated successfully." });
      handleGetData();
    } else notification.error({ message: "Updated fail." });
  };

  const handleFilter = async (data) => {
    setFilterSelected(data);
    handleGetData({ status: data });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div style={{ minWidth: "100vw", height: "100vh" }}>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "end",
          paddingTop: 200,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div style={{ color: "rgb(36, 31, 92)", fontWeight: 500 }}>
              Status
            </div>
            <Select
              options={[
                { value: "2", label: "All" },
                { value: "1", label: "Completed" },
                { value: "0", label: "Incomplete" },
              ]}
              style={{ minWidth: 120 }}
              onChange={handleFilter}
              value={filterSelected}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "fit-content" }}
            onClick={showModal}
          >
            <PlusCircleFilled />
            Add Task
          </Button>
        </div>
        <Card title="List tasks management" style={{ width: "100%" }}>
          <ListToDo
            listData={listData}
            onTodoRemoval={handleRemoveTodo}
            onTodoToggle={handleToggleTodoStatus}
          />
        </Card>
      </div>
      <AddToDo
        handleCreateTodo={handleCreateTodo}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default ToDo;
