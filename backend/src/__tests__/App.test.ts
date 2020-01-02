import request from "supertest";
import App from "../App";
import * as RealLinesManager from "../LinesManager";
import * as MockLinesManager from "../__mocks__/LinesManager";
jest.mock("../LinesManager");

const LinesManager = (RealLinesManager as typeof MockLinesManager).default;
const {
  mockGetNichandle,
  mockSetForward,
} = RealLinesManager as typeof MockLinesManager;

describe("HTTP Server", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("/states", () => {
    return request(App(new LinesManager()))
      .get("/states")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({
        nichandle: "me12345-ovh",
        lines: { number1: null, number2: "number1" },
      });
  });

  test("/states failure", () => {
    mockGetNichandle.mockRejectedValueOnce("an error");
    return request(App(new LinesManager()))
      .get("/states")
      .expect(500)
      .expect("an error");
  });

  test("/forward", () => {
    return request(App(new LinesManager()))
      .put("/forward")
      .send({ line: "number", to: "fwnumber" })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ ok: true })
      .then(() => {
        expect(mockSetForward).toBeCalledTimes(1);
        expect(mockSetForward).toBeCalledWith("number", "fwnumber");
      });
  });

  test("/forward disable", () => {
    return request(App(new LinesManager()))
      .put("/forward")
      .send({ line: "number" })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ ok: true })
      .then(() => {
        expect(mockSetForward).toBeCalledTimes(1);
        expect(mockSetForward).toBeCalledWith("number", undefined);
      });
  });

  test("static content", () => {
    return request(App(new LinesManager()))
      .get("/placeholder.txt")
      .expect(200)
      .expect("OK");
  });
});
