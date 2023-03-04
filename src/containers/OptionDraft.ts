export class OptionContainer<T> {
  _value: T | null;
  _error: Error | null = null;

  constructor(value: T | null) {
    this._value = value;
  }

  map<NT>(cb: (v: T) => NT): Option<NT> {
    try {
      return this._value === null
        ? new None(this._error)
        : new Some<NT>(cb(this._value), this._error);
    } catch (e) {
      return new None(e);
    }
  }

  mapErr<NT>(cb: (err: Error) => NT): Option<NT> {
    try {
      return this._error !== null
        ? new Some<NT>(cb(this._error), this._error)
        : new None(this._error);
    } catch (e) {
      return new None(e);
    }
  }

  hasSome(): boolean {
    return this._value !== null;
  }

  hasNone(): boolean {
    return this._value === null;
  }
}

export class Some<T> extends OptionContainer<T> {
  constructor(value: T, error: Error | null = null) {
    super(value);
    this._error = error;
  }
}

export class None extends OptionContainer<never> {
  constructor(error: Error | null = null) {
    super(null);
    this._error = error;
  }
}

export type Option<T> = None | Some<T>;

export const some = <T>(v: T): Option<T> => new Some<T>(v);
export const none = <T>(): Option<T> => new None();

enum EitherState {
  Left,
  Right,
}

export class EitherContainer<TL, TR> {
  _state: EitherState = EitherState.Left;
  _value: TL | TR;

  constructor(value: TL | TR) {
    this._value = value;
  }

  mapLeft<NTL>(cb: (v: TL) => NTL): Either<NTL, TR> {
    return this._state === EitherState.Left
      ? new Left<NTL, TR>(cb(this._value as TL))
      : new Right<NTL, TR>(this._value as TR);
  }

  mapRight<NTR>(cb: (v: TR) => NTR): Either<TL, NTR> {
    return this._state === EitherState.Right
      ? new Right<TL, NTR>(cb(this._value as TR))
      : new Left<TL, NTR>(this._value as TL);
  }
}

export class Right<TL, TR> extends EitherContainer<TL, TR> {
  _state = EitherState.Right;
}

export class Left<TL, TR> extends EitherContainer<TL, TR> {
  _state = EitherState.Left;
}

export type Either<TL, TR> = Left<TL, TR> | Right<TL, TR>;

export const left = <TL, TR>(v: TL): Either<TL, TR> => new Left<TL, TR>(v);
export const right = <TL, TR>(v: TR): Either<TL, TR> => new Right<TL, TR>(v);

const getRndEither = (): Either<number, string> =>
  Math.random() > 0.5 ? left(10) : right('Hello!');

const either = getRndEither()
  .mapLeft<number>((v) => v * 2)
  .mapRight<string[]>((v) => v.split(''));

console.log(either);

const getRndOption = (): Option<number> =>
  Math.random() > 0.5 ? some(Math.random() * 10) : none();

const option = getRndOption()
  .map((v) => {
    throw new Error('Упс, тут случилась какая-то ошибка');
    return v / 10;
  })
  .map((v) => `Fuck you x${v}`)
  .map((v) => v.split(''));

console.log(option);
