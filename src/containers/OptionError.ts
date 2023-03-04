import { None, Option } from './Option.ts';

/**
 * OptionError is a container that holds either a value of type T or an Error.
 * @class OptionError
 * @template T
 * @extends {Option<T>}
 * @example
 * const some = OptionError.error(new Error('error'));
 * const none = OptionError.none();
 */
export class OptionError<T extends Error> extends Option<T> {
  static error<T extends Error>(error: T): OptionError<T> {
    return new OptionError<T>(error);
  }

  /**
   * Extracts the value from the container.
   * @param param0
   * @returns {K}
   * @example
   * const some = OptionError.error(new Error('error'));
   * const value = some.extractError({
   *  error: (value) => value.message,
   *  none: () => 'none',
   * });
   */
  extractError<K>(
    { error, none }: { error: (value: T) => K; none: () => K },
  ): K {
    return this._value === None ? none() : error(this._value);
  }

  /**
   * Returns true if the container has an error.
   * @returns {boolean}
   */
  hasError(): boolean {
    return this.hasSome();
  }
}

export type PromiseOptionError<T extends Error> = Promise<OptionError<T>>;
