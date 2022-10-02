import { Functor } from "./Functor.ts";

export class Just<T> extends Functor<T> {
  constructor(value: T, trackId: number | null = null) {
    super(value, trackId);
  }

  extract(): T {
    return this._value;
  }

  map<K>(cb: (n: T) => K): Just<K> {
    return new Just<K>(cb(this._value), this._trackId);
  }

  async amap<K>(cb: (n: T) => Promise<K>): Promise<Just<K>> {
    return new Just<K>(await cb(this._value));
  }

  static is(entity: Maybe<unknown>): boolean {
    return entity instanceof Just;
  }

  static it<T>(value: T): Just<T> {
    return new Just<T>(value);
  }
}

export class Nothing extends Functor<null> {
  constructor(trackId: number | null = null) {
    super(null, trackId);
  }

  extract(): null {
    return null;
  }

  map(): Nothing {
    return new Nothing(this._trackId);
  }

  // deno-lint-ignore require-await
  async amap(): Promise<Nothing> {
    return new Nothing(this._trackId);
  }

  static is(entity: Maybe<unknown>): boolean {
    return entity instanceof Nothing;
  }

  static it(): Nothing {
    return new Nothing();
  }
}

export type Maybe<T> = Just<T> | Nothing;
