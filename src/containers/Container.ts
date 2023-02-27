import { NullOr } from '../types.ts';

/**
 * Container is a base class for all entities that have a value and a trackId.
 * @class Container
 * @template T
 * @template K
 * @property {T | K} value - The value contained in the container.
 * @property {number} trackId - The trackId of the container.
 */
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

  /**
   * @param cb - The callback to apply to the value.
   * @returns {Container} - Returns the container.
   */
  pass(cb: (value: T | K, trackId: number) => void) {
    cb(this._value, this._trackId);
    return this;
  }

  /**
   * @param cb {Function} - The callback to apply to the value.
   * @returns {Container} - Returns the container.
   */
  onError(cb: (err: Error) => void) {
    if (this._error != null) cb(this._error);
    return this;
  }
}
