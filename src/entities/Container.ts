import { NullOr } from '../base.ts';

export class Container<T, K> {
  protected _trackId: number;
  protected _error: Error | null = null;
  protected readonly _value: T | K;

  constructor(value: T | K, trackId: NullOr<number> = null) {
    this._trackId = trackId || Math.random();
    this._value = value;
  }

  getValue(): T | K {
    return this._value;
  }

  getTrackId(): number {
    return this._trackId;
  }

  setTrackId(trackId: number) {
    this._trackId = trackId;
    return this;
  }

  pass(cb: (value: T | K, trackId: number) => void) {
    cb(this._value, this._trackId);
    return this;
  }

  onError(cb: (err: Error) => void) {
    if (this._error != null) cb(this._error);
    return this;
  }
}
