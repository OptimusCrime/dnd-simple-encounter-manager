export const unreachableCode = (value: never): never => {
  throw new Error(`Type ${value} not handled`);
};
