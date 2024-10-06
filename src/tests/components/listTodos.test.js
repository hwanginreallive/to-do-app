import { render, screen } from "@testing-library/react";
import React from "react";
import ListToDo from "../../components/ListTodos";

jest.mock("../../components/ToDoItem", () => ({ todo }) => (
  <div data-testid="todo-item">
    <span>{todo.name}</span>
  </div>
));

describe("ListToDo Component", () => {
  const mockTodoList = [
    { id: 1, name: "Task 1", status: 0 },
    { id: 2, name: "Task 2", status: 1 },
  ];

  const onTodoRemovalMock = jest.fn();
  const onTodoToggleMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct number of ToDoItem components", () => {
    render(
      <ListToDo
        listData={mockTodoList}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems.length).toBe(mockTodoList.length);
  });

  test("renders the correct todo names", () => {
    render(
      <ListToDo
        listData={mockTodoList}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    expect(screen.getByText("Task 1")).toBeTruthy();
    expect(screen.getByText("Task 2")).toBeTruthy();
  });
});
