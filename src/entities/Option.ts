import { Container } from './Container.ts';

export const None = Symbol('None');

export class Option<T> extends Container<T, typeof None> {
  map<K>(cb: (v: T) => K): Option<K> {
    try {
      return this._value != None
        ? new Option<K>(cb(this._value), this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  // flat map
  fmap<K>(cb: (v: T) => Option<K>): Option<K> {
    try {
      return this._value != None
        ? cb(this._value).setTrackId(this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  // async map
  async amap<K>(cb: (v: T) => Promise<K>): PromiseOption<K> {
    try {
      return this._value != None
        ? new Option<K>(await cb(this._value), this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  // async flat map
  async afmap<K>(cb: (v: T) => PromiseOption<K>): PromiseOption<K> {
    try {
      return this._value != None
        ? (await cb(this._value)).setTrackId(this._trackId)
        : new Option<K>(None, this._trackId);
    } catch (e) {
      const none = new Option<K>(None, this._trackId);
      none._error = e as Error;
      return none;
    }
  }

  extract<K>({ some, none }: { some: (value: T) => K; none: () => K }): K {
    return this._value === None ? none() : some(this._value);
  }

  hasSome() {
    return this._value != None;
  }

  hasNone() {
    return this._value == None;
  }

  static some<T>(value: T): Option<T> {
    return new Option<T>(value);
  }

  static none<T>(): Option<T> {
    return new Option<T>(None);
  }
}

type PromiseOption<T> = Promise<Option<T>>;
