interface Pipe {
  <A>(a: A): A;
  <A, B>(
    a: A,
    ab: (a: A) => B,
  ): B;
  <A, B, C>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
  ): C;
  <A, B, C, D>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
  ): D;
  <A, B, C, D, E>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
  ): E;
  <A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
  ): F;
  <A, B, C, D, E, F, G>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
  ): G;
  <A, B, C, D, E, F, G, H>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
  ): H;
  <A, B, C, D, E, F, G, H, I>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
  ): I;
  <A, B, C, D, E, F, G, H, I, J>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
  ): J;
  <A, B, C, D, E, F, G, H, I, J, K>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
  ): K;
  <A, B, C, D, E, F, G, H, I, J, K, L>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
    kl: (e: K) => L,
  ): L;
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
    kl: (e: K) => L,
    lm: (e: L) => M,
  ): M;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
    kl: (e: K) => L,
    lm: (e: L) => M,
    mn: (e: M) => N,
  ): N;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
    kl: (e: K) => L,
    lm: (e: L) => M,
    mn: (e: M) => N,
    no: (e: N) => O,
  ): O;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (e: F) => G,
    gh: (e: G) => H,
    hi: (e: H) => I,
    ij: (e: I) => J,
    jk: (e: J) => K,
    kl: (e: K) => L,
    lm: (e: L) => M,
    mn: (e: M) => N,
    no: (e: N) => O,
    op: (e: O) => P,
  ): P;
}

/**
 * This pipe function that takes
 * a value and a list of functions
 * and returns the result of applying
 * the value to the functions in order.
 * @param params - The value and functions to apply.
 * @returns {*} - The result of applying the value to the functions in order.
 * @example
 * const add = (a: number) => a + 1;
 * const multiply = (a: number) => a * 2;
 * const divide = (a: number) => a / 2;
 * const subtract = (a: number) => a - 1;
 * const result = pipe(
 *  1,
 * add,
 * multiply,
 * divide,
 * subtract,
 * );
 * console.log(result); // 1
 */
// deno-lint-ignore no-explicit-any
export const pipe: Pipe = <A extends any[]>(...params: A) => {
  const [value, ...callbacks] = params;
  return callbacks.reduce((value, callback) => callback(value), value);
};
