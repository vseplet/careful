import type { NullOr } from "../types.ts";
import { Container } from "./Container.ts";

export type Effect<T> = () => T;
export type AsyncEffect<T> = () => Promise<T>;
export type AnyEffect<T> = Effect<T> | AsyncEffect<T>;

// export class IO<T> extends ContainerAbstraction<T, T> {
// }

/**
 * The IO class represents a lazy computation
 * that may produce a value of type A.
 * It is essentially a wrapper around
 * a function of type () => A, which
 * is called the "effect".
 * @class IO
 * @template T - The type of value returned by the effect
 * @property {T} value - The value contained in the container.
 * @example
 * const getDate = () => new Date().toString();
 * const dateIO = IO.of<Date>(getDate);
 * const upperIO = dateIO.map((date) => date.toUpperCase());
 * console.log(dateIO.execute());
 * // -> Output: "Sat Feb 27 2023 11:05:39 GMT-0800 (Pacific Standard Time)"
 */
export class IO<A> extends Container<Effect<A>> {
  constructor(effect: Effect<A>, trackId: NullOr<string> = null) {
    super(effect, trackId);
  }

  static of<T>(val: T) {
    return new IO(() => val);
  }

  map<B>(f: (val: A) => B): IO<B> {
    return new IO(() => f(this._value()));
  }

  fmap<B>(f: (val: A) => IO<B>): IO<B> {
    return new IO(() => f(this._value())._value());
  }

  execute() {
    return this._value();
  }

  async executeAsnyc() {
    return await (this._value as AsyncEffect<A>)();
  }
}
