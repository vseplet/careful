type Func<T, U> = (arg: T) => U;

export function compose<T, U>(f: Func<T, U>): Func<T, U>;
export function compose<T, U, V>(f: Func<T, U>, g: Func<U, V>): Func<T, V>;
export function compose<T, U, V, W>(
  f: Func<T, U>,
  g: Func<U, V>,
  h: Func<V, W>,
): Func<T, W>;
export function compose<T, U, V, W, X>(
  f: Func<T, U>,
  g: Func<U, V>,
  h: Func<V, W>,
  i: Func<W, X>,
): Func<T, X>;
export function compose<T, U, V, W, X, Y>(
  f: Func<T, U>,
  g: Func<U, V>,
  h: Func<V, W>,
  i: Func<W, X>,
  j: Func<X, Y>,
): Func<T, Y>;
export function compose<T, U, V, W, X, Y, Z>(
  f: Func<T, U>,
  g: Func<U, V>,
  h: Func<V, W>,
  i: Func<W, X>,
  j: Func<X, Y>,
  k: Func<Y, Z>,
): Func<T, Z>;
export function compose<T, U, V, W, X, Y, Z, A>(
  f: Func<T, U>,
  g: Func<U, V>,
  h: Func<V, W>,
  i: Func<W, X>,
  j: Func<X, Y>,
  k: Func<Y, Z>,
  l: Func<Z, A>,
): Func<T, A>;

/**
 * Composes functions from right to left
 * @param {Array<Func<any, any>>} funcs - functions to compose
 * @returns {Func<T, any>} composed function
 * @example
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const divide = (x: number) => x / 2;
 * const subtract = (x: number) => x - 1;
 * const result = compose(
 *   add,
 *   multiply,
 *   divide,
 *   subtract,
 * );
 * console.log(result(1)); // 1
 */
export function compose<T, U>(
  f: Func<T, U>,
  ...funcs: Array<Func<any, any>>
): Func<T, any> {
  return funcs.reduce((prevFunc, currentFunc) => {
    return function (x: T) {
      return currentFunc(prevFunc(x));
    };
  }, f);
}
