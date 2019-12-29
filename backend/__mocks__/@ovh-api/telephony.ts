const OvhTelMock$Get = jest
  .fn()
  .mockResolvedValue(["me12345-ovh-1", "me12345-ovh-2"]);
const OvhTelMock$Line$Get = jest.fn().mockResolvedValue(["0033312345689"]);
const OvhTelMock$Line$Options$Put = jest.fn().mockResolvedValue(true);
const OvhTelMock$Line$Options$Get = jest
  .fn()
  .mockResolvedValue({ forwardUnconditional: false });
const OvhTelMock$Line$ = jest
  .fn()
  .mockReturnValue({ options: { $get: OvhTelMock$Line$Options$Get, $put: OvhTelMock$Line$Options$Put } });
const OvhTelMock$ = jest.fn().mockReturnValue({
  line: { $get: OvhTelMock$Line$Get, $: OvhTelMock$Line$ },
});

const OvhTelMock = jest.fn().mockImplementation(() => {
  return { $get: OvhTelMock$Get, $: OvhTelMock$ };
});

export default OvhTelMock;
export {
  OvhTelMock$Get,
  OvhTelMock$,
  OvhTelMock$Line$Get,
  OvhTelMock$Line$,
  OvhTelMock$Line$Options$Get,
  OvhTelMock$Line$Options$Put,
};
