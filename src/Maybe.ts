import { v1 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
import { NullOr, NullOrUndefinedOr } from "./base.ts";

type TMapCallback<T, K> = (value: T) => K;

type TMapAsyncCallback<T, K> = (value: T) => Promise<K>;

type TWarpCallback<T> = () => NullOrUndefinedOr<T>;
type TWarpAsyncCallback<T> = () => Promise<NullOrUndefinedOr<T>>;

interface IMaybe<T> {
  readonly _traceId: string;
  readonly _value: NullOr<T>;
}

abstract class AMaybe<T> implements IMaybe<T> {
  abstract _traceId: string;
  abstract _value: NullOr<T>;
  abstract isSomething: boolean;
  abstract isNothing: boolean;
  abstract map<K>(cb: TMapCallback<T, K>): AMaybe<K>;
  abstract amap<K>(cb: TMapAsyncCallback<T, K>): TMaybePromise<K>;
  abstract extract(): NullOr<T>;
}

type TMaybePromise<T> = Promise<AMaybe<T>>;

export class Maybe<T> implements AMaybe<T> {
  _traceId: string;
  _value: NullOr<T>;

  constructor(val: NullOrUndefinedOr<T>, traceId: string = "") {
    this._traceId = traceId || v1.generate().toString();
    this._value = val === undefined ? null : val;
  }

  public get isSomething(): boolean {
    return this._value !== null;
  }

  public get isNothing(): boolean {
    return this._value === null;
  }

  public map<K>(cb: TMapCallback<T, K>): AMaybe<K> {
    if (this._value == null) {
      return new Maybe<K>(null, this._traceId);
    }

    try {
      return new Maybe<K>(cb(this._value), this._traceId);
    } catch (e: unknown) {
      console.error(e);
      return new Maybe<K>(null, this._traceId);
    }
  }

  public async amap<K>(cb: TMapAsyncCallback<T, K>): TMaybePromise<K> {
    if (this._value == null) {
      return new Maybe<K>(null, this._traceId);
    }

    try {
      return new Maybe<K>(await cb(this._value), this._traceId);
    } catch (e: unknown) {
      console.error(e);
      return new Maybe<K>(null, this._traceId);
    }
  }

  public extract(): NullOr<T> {
    return this._value;
  }

  static is<X>(val: NullOrUndefinedOr<X>): Maybe<X> {
    return new Maybe<X>(val);
  }

  static wrap<T>(cb: TWarpCallback<T>): AMaybe<T> {
    try {
      return Maybe.is<T>(cb());
    } catch (e: unknown) {
      console.error(e);
      return Maybe.is<T>(null);
    }
  }

  static async awrap<T>(cb: TWarpAsyncCallback<T>): TMaybePromise<T> {
    try {
      return Maybe.is<T>(await cb());
    } catch (e: unknown) {
      console.error(e);
      return Maybe.is<T>(null);
    }
  }

  public toJSON() {
    return "";
  }
}
