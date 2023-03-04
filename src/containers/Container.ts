import { uuid } from '../../deps.ts';
import { NullOr } from '../types.ts';

/**
 * Container is a base class for all entities that have a value and a trackId.
 * @class Container
 * @template T - The type of the value.
 * @property {T} value - The value contained in the container.
 * @property {string} trackId - This is a unique id used to track the container through the pipeline.
 */
export class Container<T> {
  protected _trackId: string;
  protected _error: NullOr<Error> = null;
  protected readonly _value: T;

  constructor(value: T, trackId: NullOr<string> = null) {
    this._trackId = trackId || uuid.v1.generate().toString();
    this._value = value;
  }

  getValue(): T {
    return this._value;
  }

  getTrackId(): string {
    return this._trackId;
  }

  setTrackId(trackId: string) {
    this._trackId = trackId;
    return this;
  }

  /**
   * @param cb - The callback to apply to the value.
   * @returns {Container} - Returns the container.
   */
  pass(cb: (value: T, trackId: string) => void) {
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
