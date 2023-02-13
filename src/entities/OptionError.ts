import { None, Option } from './Option.ts';

export class OptionError<T extends Error> extends Option<T> {
  static error<T extends Error>(error: T): OptionError<T> {
    return new OptionError<T>(error);
  }

  extractError<K>(
    { error, none }: { error: (value: T) => K; none: () => K },
  ): K {
    return this._value === None ? none() : error(this._value);
  }

  hasError(): boolean {
    return this.hasSome();
  }
}

export type PromiseOptionError<T extends Error> = Promise<OptionError<T>>;
