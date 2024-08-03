import { NullOr } from "../types.ts";
import { Container } from "./Container.ts";

export abstract class EitherAbstract<T> extends Container<T> {
  _value: T;

  constructor(value: T, trackId: NullOr<string> = null) {
    super(value, trackId);
    this._value = value;
  }

  abstract mL<NT>(
    cb: (v: T) => NT,
  ): EitherAbstract<T> | EitherAbstract<NT>;

  abstract mR<NT>(
    cb: (v: T) => NT,
  ): EitherAbstract<T> | EitherAbstract<NT>;

  abstract amL<NT>(
    cb: (v: T) => Promise<NT>,
  ): Promise<EitherAbstract<T> | EitherAbstract<NT>>;

  abstract amR<NT>(
    cb: (v: T) => Promise<NT>,
  ): Promise<EitherAbstract<T> | EitherAbstract<NT>>;

  abstract fmL<NT>(
    cb: (v: T) => EitherAbstract<NT>,
  ): EitherAbstract<T> | EitherAbstract<NT>;

  abstract fmR<NT>(
    cb: (v: T) => EitherAbstract<NT>,
  ): EitherAbstract<T> | EitherAbstract<NT>;

  abstract afmL<NT>(
    cb: (v: T) => Promise<EitherAbstract<NT>>,
  ): Promise<EitherAbstract<T> | EitherAbstract<NT>>;

  abstract afmR<NT>(
    cb: (v: T) => Promise<EitherAbstract<NT>>,
  ): Promise<EitherAbstract<T> | EitherAbstract<NT>>;
}

/**
 * The Left class represents the left side of Either class which by convention is a "failure".
 * @class Left<T>
 * @param T - The type of the Left value
 * @example
 * const either = left(new Error("Something went wrong!"));
 */
export class Left<T> extends EitherAbstract<T> {
  mL<NT>(cb: (v: T) => NT) {
    return new Left(cb(this._value), this._trackId);
  }

  mR() {
    return this;
  }

  async amL<NT>(cb: (v: T) => Promise<NT>) {
    return new Left(await cb(this._value), this._trackId);
  }

  async amR<NT>() {
    return this;
  }

  fmL<NT>(
    cb: (v: T) => EitherAbstract<NT>,
  ) {
    const left = cb(this._value);
    left.setTrackId(this._trackId);
    return left;
  }

  fmR() {
    return this;
  }

  async afmL<NT>(
    cb: (v: T) => Promise<EitherAbstract<NT>>,
  ) {
    const left = await cb(this._value);
    left.setTrackId(this._trackId);
    return left;
  }

  async afmR() {
    return this;
  }
}

/**
 * The Right class represents the right side of Either class which by convention is a "success".
 * @class Right<T>
 * @param T - The type of the Right value
 * @example
 * const either = right("Hello!");
 */
export class Right<T> extends EitherAbstract<T> {
  mL() {
    return this;
  }

  mR<NT>(cb: (v: T) => NT) {
    return new Right(cb(this._value), this._trackId);
  }

  async amL() {
    return this;
  }

  async amR<NT>(
    cb: (v: T) => Promise<NT>,
  ) {
    return new Right(await cb(this._value), this._trackId);
  }

  fmL() {
    return this;
  }

  fmR<NT>(
    cb: (v: T) => EitherAbstract<NT>,
  ) {
    const right = cb(this._value);
    right.setTrackId(this._trackId);
    return right;
  }

  async afmL() {
    return this;
  }

  async afmR<NT>(
    cb: (v: T) => Promise<EitherAbstract<NT>>,
  ) {
    const right = await cb(this._value);
    right.setTrackId(this._trackId);
    return right;
  }
}

/**
 * The Either class represents a value of one of two possible types
 * (a disjoint union). An Either is either a Left or a Right.
 * @type Either<TL, TR>
 * @param TL - The type of the Left value
 * @param TR - The type of the Right value
 * @example
 * const generate = (): Either<number, string> =>
 *   Math.random() > 0.5 ? left(5) : right("Hello!");

 * const either = generate()
 *   .mL((v) => v * v)
 *   .mR((v) => v.split(""));
 *
 * console.log(either);
 * // -> Left(25) or Right(["H", "e", "l", "l", "o", "!"])
 */
export type Either<TL, TR> = Left<TL> | Right<TR>;
export type EitherError<TL extends Error, TR> = Left<TL> | Right<TR>;

export const left = <TL, TR>(v: TL): Either<TL, TR> => new Left(v);
export const right = <TL, TR>(v: TR): Either<TL, TR> => new Right(v);
