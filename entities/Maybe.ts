import { NullOr } from "./base.ts";
import { MonadAbstraction } from "./Monad.ts";

export abstract class MaybeAbstracton<T> extends MonadAbstraction<T, T> {
  protected abstract isJust(): boolean;
  protected abstract isNothing(): boolean;
}

export class Maybe<T> extends MaybeAbstracton<T> {
  protected x<X>(
    cb: (v: T) => X
  ): Maybe<X> {
    throw new Error("Method not implemented.");
  }

  protected y<X>(
    md: Maybe<(v: T) => X>,
  ): Maybe<X> {
    throw new Error("Method not implemented.");
  }

  protected z<X>(
    cb: (v: T) => Maybe<X>,
  ): Maybe<X> {
    throw new Error("Method not implemented.");
  }

  protected async az<X>(
    cb: (v: T) => Promise<Maybe<X>>
  ): Promise<Maybe<X>> {
    throw new Error("Method not implemented.");
  }

  protected async ay<X>(
    md: Promise<Maybe<(v: T) => X>>
  ): Promise<Maybe<X>> {
    throw new Error("Method not implemented.");
  }

  protected async ax<X>(
    cb: (v: T) => Promise<X>
  ): Promise<Maybe<X>> {
    throw new Error("Method not implemented.");
  }


  public extract(): T | null {
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

export type PromisesMaybe<T> = Promise<Maybe<T>>
