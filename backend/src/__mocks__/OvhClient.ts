export const mockGetAccounts = jest
  .fn()
  .mockResolvedValue(["me12345-ovh-1", "me12345-ovh-2"]);
export const mockGetLines = jest.fn<Promise<string[]>, [string]>(account => {
  switch (account) {
    case "me12345-ovh-1":
      return Promise.resolve(["number-1-001", "number-1-002"]);
    case "me12345-ovh-2":
      return Promise.resolve(["number-2-003", "number-2-004"]);
  }
  return Promise.resolve([]);
});
export const mockGetForward = jest.fn<Promise<string | null>, [string, string]>(
  (account, line) => {
    if (account === "me12345-ovh-2" && line === "number-2-003") {
      return Promise.resolve("fwnumber-1-005");
    }
    return Promise.resolve(null);
  }
);
export const mockGetNichandle = jest.fn().mockResolvedValue("me12345-ovh");
export const mockSetForward = jest.fn().mockResolvedValue(true);
export const mockRemoveForward = jest.fn().mockResolvedValue(true);

const mock = jest.fn().mockImplementation(() => {
  return {
    getAccounts: mockGetAccounts,
    getLines: mockGetLines,
    getForward: mockGetForward,
    getNichandle: mockGetNichandle,
    setForward: mockSetForward,
    removeForward: mockRemoveForward,
  };
});

export default mock;
