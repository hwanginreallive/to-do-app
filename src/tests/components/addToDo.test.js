import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AddToDo from "../../components/AddToTo";

describe("AddToDo Component", () => {
  const handleCreateTodoMock = jest.fn();
  const handleCancelMock = jest.fn();

  const setup = (isModalOpen) => {
    act(() => {
      render(
        <AddToDo
          isModalOpen={isModalOpen}
          handleCreateTodo={handleCreateTodoMock}
          handleCancel={handleCancelMock}
        />,
      );
    });
  };

  test("renders the modal when isModalOpen is true", () => {
    setup(true);
    expect(screen.getByText("Create a new task")).toBeTruthy();
  });

  test("does not render the modal when isModalOpen is false", () => {
    setup(false);
    expect(screen.queryByText("Create a new task")).toBeFalsy();
  });

  test("displays validation error if name field is empty", () => {
    setup(true);

    act(() => {
      fireEvent.click(screen.getByText("OK"));
    });

    const errorMessage = screen.findByText("This field is required");
    expect(errorMessage).toBeTruthy();
  });

  test("submits form when input is valid", async () => {
    setup(true);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("What needs to be done?"), {
        target: { value: "New Task" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("OK"));
    });

    expect(handleCreateTodoMock).toHaveBeenCalledTimes(1);
    expect(handleCreateTodoMock).toHaveBeenCalledWith(
      { name: "New Task", status: 1 },
      expect.anything(),
    );
  });

  test("calls handleCancel when modal is closed", () => {
    setup(true);

    act(() => {
      fireEvent.click(screen.getByText("Cancel"));
    });

    expect(handleCancelMock).toHaveBeenCalledTimes(1);
  });
});
