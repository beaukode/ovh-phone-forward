const Mock = jest.fn().mockImplementation(() => {
  return {
    consumerKey: "myconsumerkey",
  };
});

export default Mock;
