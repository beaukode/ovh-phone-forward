import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import NumberChooser from "./NumberChooser";

const numbers = ["number-1", "number-2"];
const handleSelect = jest.fn();

describe("<NumberChooser />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render", async () => {
    const { getByRole } = render(
      <NumberChooser numbers={numbers} onSelect={handleSelect} />
    );
    expect(getByRole("dialog")).toMatchSnapshot();
  });

  test("Render without number don't show dialog", async () => {
    const { queryByRole } = render(
      <NumberChooser numbers={[]} onSelect={handleSelect} />
    );
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("Click on item call onSelect with number", async () => {
    const { getByText } = render(
      <NumberChooser numbers={numbers} onSelect={handleSelect} />
    );
    fireEvent.click(getByText("number-1"));
    expect(handleSelect).toBeCalledTimes(1);
    expect(handleSelect).toBeCalledWith("number-1");
  });

  test("Show confirm button when custom number is filled", async () => {
    const { getByPlaceholderText, queryByLabelText } = render(
      <NumberChooser numbers={numbers} onSelect={handleSelect} />
    );

    const input = getByPlaceholderText("Un autre numéro");
    expect(input).toBeInTheDocument();
    expect(queryByLabelText("Confirmer")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "newnumber-3" } });
    expect(queryByLabelText("Confirmer")).toBeInTheDocument();
  });

  test("Click on confirm call onSelect with custom number", async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <NumberChooser numbers={numbers} onSelect={handleSelect} />
    );

    fireEvent.change(getByPlaceholderText("Un autre numéro"), {
      target: { value: "newnumber-3" },
    });
    fireEvent.click(getByLabelText("Confirmer"));

    expect(handleSelect).toBeCalledTimes(1);
    expect(handleSelect).toBeCalledWith("newnumber-3");
  });
});
