import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Number from "./Number";

describe("<Number />", () => {
  test("Render", () => {
    const { container, getByTestId } = render(
      <Number number="number-1" forward={null} />
    );
    expect(container).toMatchSnapshot();
    expect(getByTestId("switch")).toBeInTheDocument();
  });

  test("Render forwarded", () => {
    const { container, getByTestId } = render(
      <Number number="number-1" forward="fwnumber-2" />
    );
    expect(container).toMatchSnapshot();
    expect(getByTestId("switch")).toBeInTheDocument();
  });

  test("Change", () => {
    const callback = jest.fn();
    const { getByRole } = render(
      <Number number="number-1" forward={null} onChange={callback} />
    );
    fireEvent.click(getByRole("checkbox"));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith("number-1", null);
  });

  test("Change forwarded", () => {
    const callback = jest.fn();
    const { getByRole } = render(
      <Number number="number-1" forward="fwnumber-2" onChange={callback} />
    );
    fireEvent.click(getByRole("checkbox"));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith("number-1", "fwnumber-2");
  });
});
