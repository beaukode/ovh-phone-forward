export const mockGetNichandle = jest.fn().mockResolvedValue("me12345-ovh");
export const mockGetLines = jest
  .fn()
  .mockResolvedValue({ number1: null, number2: "number1" });
export const mockSetForward = jest.fn().mockResolvedValue("me12345-ovh");

const mock = jest.fn().mockImplementation(() => {
  return {
    getNichandle: mockGetNichandle,
    getLines: mockGetLines,
    setForward: mockSetForward,
  };
});

export default mock;
