import OvhClient from "../OvhClient";
import Ovh from "@ovh-api/api";
import OvhMe from "@ovh-api/me";
import { OvhMeMock$Get } from "../../__mocks__/@ovh-api/me";
import {
  OvhTelMock$Get,
  OvhTelMock$Line$Get,
  OvhTelMock$,
  OvhTelMock$Line$,
  OvhTelMock$Line$Options$Get,
  OvhTelMock$Line$Options$Put,
} from "../../__mocks__/@ovh-api/telephony";

const OvhMock = (Ovh as unknown) as jest.Mock<Ovh>;
const OvhMeMock = (OvhMe as unknown) as jest.Mock;

describe("OvhClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("constructor", () => {
    new OvhClient("myappkey", "myappsecret");
    expect(OvhMock).toBeCalledTimes(1);
    expect(OvhMock).toBeCalledWith({
      appKey: "myappkey",
      appSecret: "myappsecret",
      consumerKey: undefined,
      accessRules: [
        "GET /me",
        "GET /telephony*",
        "PUT /telephony/*/line/*/options",
      ],
    });
  });

  test("constructor with consumer key", () => {
    new OvhClient("myappkey", "myappsecret", "myconsumerkey");
    expect(OvhMock).toBeCalledTimes(1);
    expect(OvhMock).toBeCalledWith({
      appKey: "myappkey",
      appSecret: "myappsecret",
      consumerKey: "myconsumerkey",
      accessRules: [
        "GET /me",
        "GET /telephony*",
        "PUT /telephony/*/line/*/options",
      ],
    });
  });

  test("getNichandle", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(client.getNichandle())
      .resolves.toBe("me12345-ovh")
      .then(() => {
        expect(OvhMeMock).toBeCalledTimes(1);
        expect(OvhMeMock$Get).toBeCalledTimes(1);
      });
  });

  test("getAccounts", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(client.getAccounts())
      .resolves.toStrictEqual(["me12345-ovh-1", "me12345-ovh-2"])
      .then(() => {
        expect(OvhTelMock$Get).toBeCalledTimes(1);
      });
  });

  test("getLines", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(client.getLines("me67890-ovh"))
      .resolves.toStrictEqual(["0033312345689"])
      .then(() => {
        expect(OvhTelMock$).toBeCalledTimes(1);
        expect(OvhTelMock$).toBeCalledWith("me67890-ovh");
        expect(OvhTelMock$Line$Get).toBeCalledTimes(1);
      });
  });

  test("getForward", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(client.getForward("me67890-ovh", "0033312345689"))
      .resolves.toBeNull()
      .then(() => {
        expect(OvhTelMock$).toBeCalledTimes(1);
        expect(OvhTelMock$).toBeCalledWith("me67890-ovh");
        expect(OvhTelMock$Line$).toBeCalledTimes(1);
        expect(OvhTelMock$Line$).toBeCalledWith("0033312345689");
        expect(OvhTelMock$Line$Options$Get).toBeCalledTimes(1);

        OvhTelMock$Line$Options$Get.mockResolvedValueOnce({
          forwardUnconditional: true,
          forwardUnconditionalNumber: "0033300000000",
        });
        return expect(
          client.getForward("me67890-ovh", "0033312345689")
        ).resolves.toBe("0033300000000");
      });
  });

  test("setForward", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(
      client.setForward("me67890-ovh", "0033312345689", "0033300000000")
    )
      .resolves.toBeTruthy()
      .then(() => {
        expect(OvhTelMock$).toBeCalledTimes(1);
        expect(OvhTelMock$).toBeCalledWith("me67890-ovh");
        expect(OvhTelMock$Line$).toBeCalledTimes(1);
        expect(OvhTelMock$Line$).toBeCalledWith("0033312345689");
        expect(OvhTelMock$Line$Options$Put).toBeCalledTimes(1);
        expect(OvhTelMock$Line$Options$Put).toHaveBeenCalledWith({
          forwardUnconditional: true,
          forwardBackupNature: "number",
          forwardBackupNumber: "0033300000000",
        });
      });
  });

  test("setForward", () => {
    const client = new OvhClient("myappkey", "myappsecret");
    return expect(client.removeForward("me67890-ovh", "0033312345689"))
      .resolves.toBeTruthy()
      .then(() => {
        expect(OvhTelMock$).toBeCalledTimes(1);
        expect(OvhTelMock$).toBeCalledWith("me67890-ovh");
        expect(OvhTelMock$Line$).toBeCalledTimes(1);
        expect(OvhTelMock$Line$).toBeCalledWith("0033312345689");
        expect(OvhTelMock$Line$Options$Put).toBeCalledTimes(1);
        expect(OvhTelMock$Line$Options$Put).toHaveBeenCalledWith({
          forwardUnconditional: false,
        });
      });
  });
});
