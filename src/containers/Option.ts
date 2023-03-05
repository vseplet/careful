import { NullOr } from '../types.ts';
import { Container } from './Container.ts';

/**
 * OptionAbstract is a type that represents either a value or no value.
 * It is similar to the Maybe type in Haskell.
 * @abstract OptionAbstract<T>
 * @template T - Type of stored value
 */
export abstract class OptionAbstract<T> extends Container<T> {
  _value: T;

  constructor(value: T, trackId: NullOr<string> = null) {
    super(value, trackId);
    this._value = value;
  }

  /**
   * Map
   * @param cb - The callback function to map the value.
   * @returns {OptionAbstract<T> | OptionAbstract<NT>} - The mapped value.
   * @example
   */
  abstract m<NT>(cb: (v: T) => NT): OptionAbstract<T> | OptionAbstract<NT>;

  /**
   * Async Map
   * @param cb - The callback function to map the value.
   * @returns {Promise<OptionAbstract<T> | OptionAbstract<NT>>} - The mapped value.
   * @example
   */
  abstract am<NT>(
    cb: (v: T) => Promise<NT>,
  ): Promise<OptionAbstract<T> | OptionAbstract<NT>>;

  abstract fm<NT>(
    cb: (v: T) => OptionAbstract<NT>,
  ): OptionAbstract<T> | OptionAbstract<NT>;

  abstract afm<NT>(
    cb: (v: T) => Promise<OptionAbstract<NT>>,
  ): Promise<OptionAbstract<T> | OptionAbstract<NT>>;
}

/**
 * Some is a type that represents a value.
 * It is similar to the Just type in Haskell.
 * @class Some<T>
 * @template T - Type of stored value
 * @example
 * const some = new Some(1);
 */
export class Some<T> extends OptionAbstract<T> {
  /**
   * Map
   * @param cb
   * @template NT
   * @returns
   */
  m<NT>(cb: (v: T) => NT) {
    return new Some<NT>(cb(this._value), this._trackId);
  }

  /**
   * Async Map
   * @param cb
   * @template NT
   * @returns
   */
  async am<NT>(cb: (v: T) => Promise<NT>) {
    return new Some<NT>(await cb(this._value), this._trackId);
  }

  /**
   * Flat Map
   * @param cb
   * @template NT
   * @returns
   */
  fm<NT>(
    cb: (v: T) => OptionAbstract<NT>,
  ): OptionAbstract<T> | OptionAbstract<NT> {
    return cb(this._value);
  }

  /**
   * Async Flat Map
   * @param cb
   * @template NT
   * @returns
   */
  async afm<NT>(
    cb: (v: T) => Promise<OptionAbstract<NT>>,
  ): Promise<OptionAbstract<T> | OptionAbstract<NT>> {
    return await cb(this._value);
  }
}

/**
 * None is a type that represents no value.
 * It is similar to the Nothing type in Haskell.
 * @class None
 * @example
 * const none = new None();
 */
export class None extends OptionAbstract<null> {
  constructor() {
    super(null);
  }

  /**
   * Map
   * @returns {None}
   */
  m() {
    return this;
  }

  /**
   * Asnyc Map
   * @returns {Promise<None>}
   */
  async am() {
    return this;
  }

  /**
   * Flat Map
   * @returns {None}
   */
  fm() {
    return this;
  }

  /**
   * Asnyc Flat Map
   * @returns {Promise<None>}
   */
  async afm() {
    return this;
  }
}

/**
 * Option is a type that represents either a value or no value.
 * It is similar to the Maybe type in Haskell.
 * @type Option<T>
 * @template T - Type of possible stored value
 * @example
 * const generate = (): Option<number> =>
 *   Math.random() > 0.5 ? some(Math.random() * 10) : none();
 *
 * const option: Option<string[]> = generate()
 *   .m((v) => v / 10)
 *   .m((v) => `Mul x${v}`)
 *   .m((v) => v.split(""));
 *
 * console.log(option);
 * // -> Some(["M", "u", "l", " ", "x", "0", ".", "1"]) or None
 */
export type Option<T> = Some<T> | None;

/**
 * Some - Creates a new Some instance.
 * @param v - The value to store.
 * @returns {Some<T>} - The created instance.
 */
export const some = <T>(v: T): Option<T> => new Some<T>(v);
/**
 * None - Creates a new None instance.
 * @returns {None} - The created instance.
 */
export const none = <T>(): Option<T> => new None();
