import { NullOr } from '../types.ts';
import { Container } from './Container.ts';

export abstract class OptionAbstract<T> extends Container<T> {
  _value: T;

  constructor(value: T, trackId: NullOr<string> = null) {
    super(value, trackId);
    this._value = value;
  }

  abstract m<NT>(cb: (v: T) => NT): OptionAbstract<T> | OptionAbstract<NT>;

  abstract am<NT>(
    cb: (v: T) => Promise<NT>,
  ): Promise<OptionAbstract<T> | OptionAbstract<NT>>;

  /*
  abstract fmap<NT>(
    cb: (v: T) => OptionAbstract<NT>,
  ): OptionAbstract<T> | OptionAbstract<NT>;

  abstract async afmap<NT>(
    cb: (v: T) => Promise<OptionAbstract<NT>>,
  ): Promise<OptionAbstract<T> | OptionAbstract<NT>>;
  */
}

export class Some<T> extends OptionAbstract<T> {
  m<NT>(cb: (v: T) => NT) {
    return new Some<NT>(cb(this._value), this._trackId);
  }

  async am<NT>(cb: (v: T) => Promise<NT>) {
    return new Some<NT>(await cb(this._value), this._trackId);
  }
}

export class None extends OptionAbstract<null> {
  constructor() {
    super(null);
  }

  m() {
    return this;
  }

  async am() {
    return this;
  }

  fm() {
    return this;
  }

  async afm() {
    return this;
  }
}

/**
 * Option is a type that represents either a value or no value.
 * It is similar to the Maybe type in Haskell.
 * @template T - The type of the value.
 * @example
 * const getRndOption = (): Option<number> =>
 *   Math.random() > 0.5 ? some(Math.random() * 10) : none();
 *
 * const option: Option<string[]> = getRndOption()
 *   .m((v) => v / 10)
 *   .m((v) => `Mul x${v}`)
 *   .m((v) => v.split(""));
 *
 * console.log(option);
 */
export type Option<T> = Some<T> | None;

export const some = <T>(v: T): Option<T> => new Some<T>(v);
export const none = <T>(): Option<T> => new None();
