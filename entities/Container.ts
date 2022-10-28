import { NullOr } from "./base.ts";

export abstract class ContainerAbstraction<T, K> {
  protected _trackId: number;
  protected _value: T | K;

  constructor(value: T | K, trackId: NullOr<number> = null) {
    this._value = value;
    this._trackId = trackId || Math.random();
  }

  protected abstract extract(): T | K;
}
