const OvhMeMock$Get = jest.fn().mockResolvedValue({ nichandle: "me12345-ovh" });

const OvhMeMock = jest.fn().mockImplementation(() => {
  return { $get: OvhMeMock$Get };
});

export default OvhMeMock;
export { OvhMeMock$Get };
