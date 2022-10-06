export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      arrayToBeUnique(): R;
    }
  }
}
