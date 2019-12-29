import Lines from "../LinesManager";
import * as RealOvhClient from "../OvhClient";
import * as MockOvhClient from "../__mocks__/OvhClient";
import LinesManager from "../LinesManager";
jest.mock("../OvhClient");

const OvhClient = (RealOvhClient as typeof MockOvhClient).default;
const {
  mockGetAccounts,
  mockGetLines,
  mockGetForward,
  mockGetNichandle,
  mockSetForward,
  mockRemoveForward,
} = RealOvhClient as typeof MockOvhClient;

describe("Lines", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("constructor", () => {
    const lines = new LinesManager(new OvhClient());
    expect(lines).toBeInstanceOf(Lines);
  });

  test("getLines", () => {
    const lines = new LinesManager(new OvhClient());
    return expect(lines.getLines())
      .resolves.toStrictEqual({
        "number-1-001": null,
        "number-1-002": null,
        "number-2-003": "fwnumber-1-005",
        "number-2-004": null,
      })
      .then(() => {
        expect(mockGetAccounts).toBeCalledTimes(1);
        expect(mockGetLines).toBeCalledTimes(2);
        expect(mockGetLines).toBeCalledWith("me12345-ovh-1");
        expect(mockGetLines).toBeCalledWith("me12345-ovh-2");
        expect(mockGetForward).toBeCalledTimes(4);
        expect(mockGetForward).toBeCalledWith("me12345-ovh-1", "number-1-001");
        expect(mockGetForward).toBeCalledWith("me12345-ovh-1", "number-1-002");
        expect(mockGetForward).toBeCalledWith("me12345-ovh-2", "number-2-003");
        expect(mockGetForward).toBeCalledWith("me12345-ovh-2", "number-2-004");
      });
  });

  test("getNichandle", () => {
    const lines = new LinesManager(new OvhClient());
    return expect(lines.getNichandle())
      .resolves.toBe("me12345-ovh")
      .then(() => {
        expect(mockGetNichandle).toBeCalledTimes(1);
      });
  });

  test("setForward", () => {
    const lines = new LinesManager(new OvhClient());
    return expect(lines.setForward("number-1-001", "fwnumber-1-001"))
      .resolves.toBeTruthy()
      .then(() => {
        expect(mockSetForward).toBeCalledTimes(1);
        expect(mockSetForward).toBeCalledWith(
          "me12345-ovh-1",
          "number-1-001",
          "fwnumber-1-001"
        );
      });
  });

  test("setForward disable", () => {
    const lines = new LinesManager(new OvhClient());
    return expect(lines.setForward("number-1-001"))
      .resolves.toBeTruthy()
      .then(() => {
        expect(mockRemoveForward).toBeCalledTimes(1);
        expect(mockRemoveForward).toBeCalledWith(
          "me12345-ovh-1",
          "number-1-001"
        );
      });
  });

  test("setForward unknown line", () => {
    const lines = new LinesManager(new OvhClient());
    return expect(lines.setForward("number-000", "fwnumber"))
      .rejects.toBe("Line not found: number-000")
      .then(() => {
        expect(mockSetForward).not.toBeCalled();
        expect(mockRemoveForward).not.toBeCalled();
      });
  });
});
