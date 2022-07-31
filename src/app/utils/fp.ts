export const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((res, fn) => fn(res), x);
