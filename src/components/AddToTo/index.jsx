import { Form, Input, Modal, Select } from "antd";

import React from "react";

const AddToDo = ({ isModalOpen, handleCreateTodo, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    handleCreateTodo(data, form);
  };

  return (
    <Modal
      title="Create a new task"
      open={isModalOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="todo-form"
        initialValues={{
          name: "",
          status: 1,
        }}
        style={{ padding: 20 }}
      >
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "This field is required" }]}
          label="Name"
        >
          <Input placeholder="What needs to be done?" maxLength={48} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select
            options={[
              {
                value: 1,
                label: "Completed",
              },
              {
                value: 0,
                label: "Incomplete",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddToDo;
