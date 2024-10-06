import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ToDoItem from "../../components/ToDoItem";

// Mocked functions
const onTodoRemovalMock = jest.fn();
const onTodoToggleMock = jest.fn();

const todoMock = {
  id: 1,
  name: "Test ToDo",
  status: 0,
};

describe("ToDoItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the todo item", () => {
    render(
      <ToDoItem
        todo={todoMock}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    expect(screen.getByText("Test ToDo")).toBeTruthy();
  });

  test("toggles todo status when switch is clicked", () => {
    render(
      <ToDoItem
        todo={todoMock}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    fireEvent.click(screen.getByRole("switch"));

    expect(onTodoToggleMock).toHaveBeenCalledWith({
      ...todoMock,
      status: 1,
    });
  });

  test("triggers todo removal on confirmation", () => {
    render(
      <ToDoItem
        todo={todoMock}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    fireEvent.click(screen.getByText("X"));

    fireEvent.click(screen.getByText("OK"));

    expect(onTodoRemovalMock).toHaveBeenCalledWith(todoMock);
  });

  test("does not remove todo when cancellation is chosen", () => {
    render(
      <ToDoItem
        todo={todoMock}
        onTodoRemoval={onTodoRemovalMock}
        onTodoToggle={onTodoToggleMock}
      />,
    );

    fireEvent.click(screen.getByText("X"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(onTodoRemovalMock).not.toHaveBeenCalled();
  });
});
