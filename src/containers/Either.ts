import { NullOr } from '../types.ts';
import { Container } from './Container.ts';

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

  hello() {
    return 10;
  }

  /*
  abstract amL
  abstract amR

  abstract fmL
  abstract fmR

  abstract afmL
  abstract afmR
  */
}

export class Left<T> extends EitherAbstract<T> {
  mL<NT>(cb: (v: T) => NT) {
    return new Left(cb(this._value), this._trackId);
  }

  mR() {
    return this;
  }
}

export class Right<T> extends EitherAbstract<T> {
  mL() {
    return this;
  }

  mR<NT>(cb: (v: T) => NT) {
    return new Right(cb(this._value), this._trackId);
  }
}

export type Either<TL, TR> = Left<TL> | Right<TR>;

export const left = <TL, TR>(v: TL): Either<TL, TR> => new Left(v);
export const right = <TL, TR>(v: TR): Either<TL, TR> => new Right(v);
