import { Container } from './Container.ts';

export const None = Symbol('None');

/**
 * Option is a container that may or may not contain a value.
 * It is similar to Maybe in Haskell.
 * @class Option
 * @template T
 * @extends Container
 * @property {T} value - The value contained in the container.
 * @example
 * const some = Option.some(1);
 * const none = Option.none();
 */
export class Option<T> extends Container<T, typeof None> {
  /**
   * This is a static method that creates a new Option with a value.
   * @param cb - The callback to apply to the value.
   * @returns {Option} - Returns a new Option with the result of the callback.
   * @example
   * const some = Option.some(1);
   * const result = some.map((value) => value + 1);
   * console.log(result); // Option { value: 2 }
   */
  map<K>(cb: (v: T) => K): Option<K> {
    try {
      return this._value != None
        ? new Option<K>(cb(this._value), this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  /**
   * This is the same as map but it is used for chaining.
   * @param cb - The callback to apply to the value.
   * @returns {Option} - Returns a new Option with the result of the callback.
   * @example
   * const some = Option.some(1);
   * const result = some.fmap((value) => value + 1);
   * console.log(result); // Option { value: 2 }
   */
  fmap<K>(cb: (v: T) => Option<K>): Option<K> {
    try {
      return this._value != None
        ? cb(this._value).setTrackId(this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  /**
   * This is the same as map but it is used for async functions.
   * @param cb - The callback to apply to the value.
   * @returns {PromiseOption} - Returns a new Option with the result of the callback.
   * @example
   * const some = Option.some(1);
   * const result = await some.amap((value) => value + 1);
   * console.log(result); // Option { value: 2 }
   */
  async amap<K>(cb: (v: T) => Promise<K>): PromiseOption<K> {
    try {
      return this._value != None
        ? new Option<K>(await cb(this._value), this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  /**
   * This is the same as fmap but it is used for async functions.
   * @param cb - The callback to apply to the value.
   * @returns {PromiseOption} - Returns a new Option with the result of the callback.
   * @example
   * const some = Option.some(1);
   * const result = await some.afmap((value) => value + 1);
   * console.log(result); // Option { value: 2 }
   */
  async afmap<K>(cb: (v: T) => PromiseOption<K>): PromiseOption<K> {
    try {
      return this._value != None
        ? (await cb(this._value)).setTrackId(this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  /**
   * This is a method that applies a callback to the value if it exists.
   * @example
   * const some = Option.some<number>(1);
   * const value = some.extract({
   *  some: (value) => value,
   *  none: () => 0
   * });
   * console.log(value); // 1
   * @example
   * const some = Option.none<number>();
   * const value = some.extract({
   *  some: (value) => value,
   *  none: () => 0
   * });
   * console.log(value); // 0
   */
  extract<K>({ some, none }: { some: (value: T) => K; none: () => K }): K {
    return this._value === None ? none() : some(this._value);
  }

  /**
   * This is a method checks if the container has a value.
   * @returns {boolean} - Returns true if the container has a value.
   */
  hasSome() {
    return this._value != None;
  }

  /**
   * This is a method checks if the container has no value.
   * @returns {boolean} - Returns true if the container has no value.
   */
  hasNone() {
    return this._value == None;
  }

  /**
   * This is a static method that creates a new Option with a value.
   * @param value
   * @returns {Option} - Returns a new Option with the value.
   */
  static some<T>(value: T): Option<T> {
    return new Option<T>(value);
  }

  /**
   * This is a static method that creates a new Option with no value.
   * @returns {Option} - Returns a new Option with no value.
   */
  static none<T>(): Option<T> {
    return new Option<T>(None);
  }
}

export type PromiseOption<T> = Promise<Option<T>>;
