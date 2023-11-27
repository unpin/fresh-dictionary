// deno-lint-ignore ban-types
export function throttle(fn: Function, waitMS: number) {
  let timeout: null | number = null;

  return function (...args: unknown[]) {
    if (timeout === null) {
      timeout = setTimeout(() => {
        fn(...args);
        timeout = null;
      }, waitMS);
    }
  };
}

export function asyncThrottle(
  // deno-lint-ignore no-explicit-any
  fn: (...args: any[]) => Promise<unknown>,
  waitMS: number,
) {
  let timeout: null | number = null;
  return (...args: unknown[]) =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(fn(...args)), waitMS);
    });
}
