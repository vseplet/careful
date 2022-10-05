import { NullOr } from "./base.ts";
import { MonadAbstraction } from "./Monad.ts";

abstract class MaybeAbstracton<T> extends MonadAbstraction<T, T> {
  abstract isJust(): boolean;
  abstract isNothing(): boolean;
}

export class Maybe<T> extends MaybeAbstracton<T> {
  protected map<X>(cb: (v: T) => X): Maybe<X | T> {
    throw new Error("Method not implemented.");
  }
  protected amap<X>(
    md: Maybe<(v: T) => X>,
  ): Maybe<X | T> {
    throw new Error("Method not implemented.");
  }
  protected fmap<X>(
    cb: (v: T) => Maybe<X>,
  ): Maybe<X | T> {
    throw new Error("Method not implemented.");
  }

  extract(): T | null {
    return this._value;
  }

  isJust(): boolean {
    return this._value !== null;
  }

  isNothing(): boolean {
    return this._value === null;
  }

  static it<T>(value: NullOr<T>) {
    return new Maybe<T>(value);
  }

  static just<T>(v: T): Maybe<T> {
    return new Maybe<T>(v);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }
}
