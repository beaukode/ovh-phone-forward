import React from "react";
import {
  render,
  fireEvent,
  getByText,
  queryByText,
} from "@testing-library/react";
import App from "./App";

const fetchResponse = {
  status: 200,
  json: jest.fn().mockResolvedValue({
    nichandle: "me12345-ovh",
    lines: {
      "number-1": null,
      "number-2": "fwnumber-2",
    },
  }),
};

describe("<App />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Fetch data", async () => {
    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValue(fetchResponse as any);

    const { findByText, getByText, queryByText } = render(<App />);
    expect(getByText(/Chargement des numéros/i)).toBeInTheDocument();

    // After loading
    expect(await findByText("number-1")).toBeInTheDocument();
    expect(queryByText(/Chargement des numéros/i)).not.toBeInTheDocument();
    expect(queryByText("me12345-ovh")).toBeInTheDocument();
    expect(queryByText("number-2")).toBeInTheDocument();
    expect(queryByText("fwnumber-2")).toBeInTheDocument();
    expect(spyFetch).toBeCalledTimes(1);
    expect(spyFetch).toBeCalledWith("states");
  });

  test("Fetch data: handle reject", async () => {
    jest.spyOn(window, "fetch").mockRejectedValue("an error");

    const { findByText, getByText } = render(<App />);
    const loadingEl = getByText(/Chargement des numéros/i);
    expect(loadingEl).toBeInTheDocument();
    const errorEl = await findByText(/Erreur lors du chargement des lignes/i);
    expect(errorEl).toBeInTheDocument();
  });

  test("Fetch data: handle server error", async () => {
    const fetchResponse = {
      status: 500,
      statusText: "Internal server error",
    };
    jest.spyOn(window, "fetch").mockResolvedValue(fetchResponse as any);

    const { findByText, getByText } = render(<App />);
    const loadingEl = getByText(/Chargement des numéros/i);
    expect(loadingEl).toBeInTheDocument();
    const errorEl = await findByText(/Erreur lors du chargement des lignes/i);
    expect(errorEl).toBeInTheDocument();
  });

  test("Disable forward", async () => {
    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce(fetchResponse as any);

    const { findByLabelText, queryByText } = render(<App />);

    // After loading
    const checkbox = (await findByLabelText("number-2")) as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();
    expect(queryByText("fwnumber-2")).toBeInTheDocument();
    spyFetch.mockClear();
    spyFetch.mockResolvedValueOnce({ status: 200 } as any);

    // Click on switch
    fireEvent.click(checkbox);
    expect(spyFetch).toBeCalledTimes(1);
    expect(spyFetch).toBeCalledWith("forward", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ line: "number-2" }),
    });
    expect(queryByText("fwnumber-2")).not.toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();
  });

  test("Disable forward: restore state on failure", async () => {
    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce(fetchResponse as any);

    const { findByLabelText, queryByText, findByText } = render(<App />);

    // After loading
    const checkbox = (await findByLabelText("number-2")) as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();
    expect(queryByText("fwnumber-2")).toBeInTheDocument();
    spyFetch.mockClear();
    spyFetch.mockRejectedValueOnce("an error");
    fireEvent.click(checkbox);

    // After error
    expect(
      await findByText(/Erreur lors de la désactivation/i)
    ).toBeInTheDocument();
    expect(queryByText("fwnumber-2")).toBeInTheDocument();
    expect(checkbox.checked).toBeTruthy();
  });

  test("Enable forward", async () => {
    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce(fetchResponse as any);

    const { findByLabelText, queryByRole } = render(<App />);

    // After loading
    const checkbox = (await findByLabelText("number-1")) as HTMLInputElement;
    expect(checkbox.checked).toBeFalsy();
    spyFetch.mockClear();
    spyFetch.mockResolvedValueOnce({ status: 200 } as any);

    // Click on switch
    fireEvent.click(checkbox);
    const dialog = queryByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(queryByText(dialog!, "Transfer vers")).toBeInTheDocument();

    // Select number
    fireEvent.click(getByText(dialog!, "number-2"));
    expect(queryByRole("dialog")).not.toBeInTheDocument();

    expect(spyFetch).toBeCalledTimes(1);
    expect(spyFetch).toBeCalledWith("forward", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ line: "number-1", to: "number-2" }),
    });

    expect(checkbox.checked).toBeTruthy();
  });

  test("Enable forward: restore state on failure", async () => {
    const spyFetch = jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce(fetchResponse as any);

    const { findByLabelText, queryByRole, findByText } = render(<App />);

    // After loading
    const checkbox = (await findByLabelText("number-1")) as HTMLInputElement;
    expect(checkbox.checked).toBeFalsy();
    spyFetch.mockClear();
    spyFetch.mockRejectedValue("an error");

    // Click on switch
    fireEvent.click(checkbox);
    const dialog = queryByRole("dialog");

    // Select number
    fireEvent.click(getByText(dialog!, "number-2"));
    expect(spyFetch).toBeCalledTimes(1);

    // After error
    expect(
      await findByText(/Erreur lors de l'activation/i)
    ).toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();
  });
});
