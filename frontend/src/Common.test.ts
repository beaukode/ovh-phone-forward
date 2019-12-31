import { extractNumbers } from "./Common";

describe("Common", () => {
  test("extractNumbers", () => {
    expect(
      extractNumbers({ "number-1": "fwnumber-1", "number-2": "fwnumber-2" })
    ).toStrictEqual(["number-1", "number-2", "fwnumber-1", "fwnumber-2"]);
    expect(
      extractNumbers({ "number-1": "fwnumber-1", "number-2": null })
    ).toStrictEqual(["number-1", "number-2", "fwnumber-1"]);
  });
});
