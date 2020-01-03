import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AboutDialog from "./AboutDialog";

const handleClose = jest.fn();

describe("<NumberChooser />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render", async () => {
    const { queryByRole, queryByText } = render(
      <AboutDialog open={true} onClose={handleClose} />
    );
    expect(queryByRole("dialog")).toBeInTheDocument();
    expect(queryByText("A propos de : OVH Phone Forward")).toBeInTheDocument();
    expect(queryByRole("button")).toBeInTheDocument();
  });

  test("Render closed", async () => {
    const { queryByRole } = render(
      <AboutDialog open={false} onClose={handleClose} />
    );
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("Click on button call close callback", async () => {
    const { getByRole } = render(
      <AboutDialog open={true} onClose={handleClose} />
    );
    expect(handleClose).not.toBeCalled();
    fireEvent.click(getByRole("button"));
    expect(handleClose).toBeCalledTimes(1);
  });
});
