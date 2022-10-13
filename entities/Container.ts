export abstract class ContainerAbstraction<T> {
  protected _trackId: number;
  protected _value: (T | null) | T;

  constructor(value: (T | null) | T, trackId: number | null = null) {
    this._value = value;
    this._trackId = trackId || Math.random();
  }

  protected abstract extract(): (T | null) | T;
}
