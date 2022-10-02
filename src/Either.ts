import { Functor } from "./Functor.ts";

abstract class EitherFunctor<T> extends Functor<T> {
  abstract extractLeft(): T | null;
  abstract extractRight(): T | null;
  abstract mapLeft<K>(cb: (value: T) => K): EitherFunctor<K> | EitherFunctor<T>;
  abstract mapRight<K>(
    cb: (value: T) => K,
  ): EitherFunctor<K> | EitherFunctor<T>;

  // abstract aMapLeft<K>(
  //   cb: (value: T) => K,
  // ): Promise<EitherFunctor<K> | EitherFunctor<T>>;
  // abstract aMapRight<K>(
  //   cb: (value: T) => K,
  // ): Promise<EitherFunctor<K> | EitherFunctor<T>>;
}

export class Left<TL> extends EitherFunctor<TL> {
  constructor(left: TL, trackId: number | null = null) {
    super(left, trackId);
  }

  extract(): TL {
    return this._value;
  }

  map<KL>(cb: (value: TL) => KL): Left<KL> {
    return new Left<KL>(cb(this._value));
  }

  extractLeft(): TL {
    return this.extract();
  }

  extractRight() {
    return null;
  }

  mapLeft<KL>(cb: (n: TL) => KL): Left<KL> {
    return this.map<KL>(cb);
  }

  mapRight() {
    return this;
  }

  static is(entity: Either<unknown, unknown>): boolean {
    return entity instanceof Left;
  }

  static it<T>(value: T): Left<T> {
    return new Left<T>(value);
  }
}
export class Right<TR> extends EitherFunctor<TR> {
  constructor(right: TR, trackId: number | null = null) {
    super(right, trackId);
  }

  public map<KR>(cb: (value: TR) => KR): Right<KR> {
    return new Right<KR>(cb(this._value));
  }

  extract(): TR {
    return this._value;
  }

  extractRight(): TR {
    return this._value;
  }

  extractLeft(): null {
    return null;
  }

  mapLeft(): Right<TR> {
    return this;
  }

  mapRight<KR>(cb: (n: TR) => KR): Right<KR> {
    return this.map<KR>(cb);
  }

  static is(entity: Either<unknown, unknown>): boolean {
    return entity instanceof Right;
  }

  static it<T>(value: T): Right<T> {
    return new Right<T>(value);
  }
}

export type Either<TL, TR> = Left<TL> | Right<TR>;
