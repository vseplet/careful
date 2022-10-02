export abstract class Functor<T> {
  protected _trackId: number;
  protected _value: T;

  constructor(value: T, trackId: number | null = null) {
    this._value = value;
    this._trackId = trackId || Math.random();
  }

  abstract extract(): T;
  abstract map<K>(cb: (value: T) => K): Functor<K> | Functor<T>;
  // abstract amap<K>(cb: (value: T) => K): Promise<Functor<K> | Functor<T>>;
}
