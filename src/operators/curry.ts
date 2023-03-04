/**
 * This curry function takes in a function fn and
 * returns a curried version of it.
 * When the curried function is called with arguments,
 * it checks if the number of arguments is greater
 * than or equal to the number of arguments
 * the original function fn takes.
 * @param fn - The function to curry.
 * @returns - A curried version of the function fn.
 * @example
 * function add(a: number, b: number, c: number) {
 *  return a + b + c;
 * }
 * const curriedAdd = curry(add);
 * console.log(curriedAdd(1)(2)(3)); // prints 6
 * console.log(curriedAdd(1, 2)(3)); // prints 6
 */
export function curry<T extends unknown[], R>(fn: (...args: T) => R) {
  return function curried(...args: T) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs: T) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// TODO: make async curry
