import { ContainerAbstraction } from "./Container.ts";

export abstract class MaybeAbstracton<T> extends ContainerAbstraction<T, null> {
  protected abstract isJust(): boolean;
  protected abstract isNothing(): boolean;
}

export class Maybe<T> extends MaybeAbstracton<T> {
  smap<K>(cb: (v: T) => K): Maybe<K> {
    if (this._value !== null) {
      return new Maybe<K>(cb(this._value), this._trackId)
    } else {
      return new Maybe<K>(null, this._trackId)
    }
  }

  async map<K>(cb: (v: T) => Promise<K>): Promise<Maybe<K>> {
    if (this._value !== null) {
      return new Maybe<K>(await cb(this._value), this._trackId)
    } else {
      return new Maybe<K>(null, this._trackId)
    }
  }

  sfmap<K>(cb: (v: T) => K): Maybe<K> {
    if (this._value !== null) {
      return new Maybe<K>(cb(this._value), this._trackId)
    } else {
      return new Maybe<K>(null, this._trackId)
    }
  }

  async fmap<K>(cb: (v: T) => Promise<K>): Promise<Maybe<K>> {
    if (this._value !== null) {
      return new Maybe<K>(await cb(this._value), this._trackId)
    } else {
      return new Maybe<K>(null, this._trackId)
    }
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

  static just<T>(value: T): Maybe<T> {
    return new Maybe<T>(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }
}

export type PromisesMaybe<T> = Promise<Maybe<T>>
