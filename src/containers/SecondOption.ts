import { None, Option } from './Option.ts';

export class SecondOption<F, S> {
  readonly first: F;
  readonly second: Option<S>;

  constructor(f: F, s: S | typeof None = None) {
    this.first = f;
    this.second = new Option<S>(s);
  }

  static one<F, S>(f: F) {
    return new SecondOption<F, S>(f);
  }

  static both<F, S>(f: F, s: S) {
    return new SecondOption<F, S>(f, s);
  }
}
