expect.extend({
  arrayToBeUnique(received) {
    const isUnique =
      Array.isArray(received) && new Set(received).size === received.length;
    if (isUnique) {
      return {
        message: () => `Expected [${received}] array is unique`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected [${received}] array is not unique`,
        pass: false,
      };
    }
  },
});
