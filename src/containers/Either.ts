import { NullOr } from '../types.ts';
import { Container } from './Container.ts';

const Right = Symbol('Right');
const Left = Symbol('Left');

type EitherState = typeof Right | typeof Left;

export class Either<TL, TR> extends Container<TL, TR> {
  protected _state: EitherState;

  constructor(
    value: TL | TR,
    state: EitherState,
    trackId: NullOr<number> = null,
  ) {
    super(value, trackId);
    this._state = state;
  }

  /**
   * @param cb - The callback to apply to the value.
   * @returns {Either} - Returns a new Either with the result of the callback.
   * @example
   * const either = Either.right(1);
   * const result = either.mapLeft((value) => value + 1);
   * console.log(result); // Either { value: 2 }
   */
  mapLeft<TLL>(cb: (v: TL) => TLL): Either<TLL, TR> {
    try {
      return this._state === Left
        ? new Either<TLL, TR>(cb(this._value as TL), Left, this._trackId)
        : new Either<TLL, TR>(this._value as TR, Right, this._trackId);
    } catch (e) {
      const either = new Either<TLL, TR>(
        this._value as TR,
        Right,
        this._trackId,
      );
      either._error = e as Error;
      return either;
    }
  }

  /**
   * @param cb - The callback to apply to the value.
   * @returns {Either} - Returns a new Either with the result of the callback.
   * @example
   * const either = Either.right<number, string>("1");
   * const result = either.mapRight((value) => value + "1");
   * console.log(result); // Either { value: "11" }
   */
  mapRight<TRR>(cb: (v: TR) => TRR): Either<TL, TRR> {
    try {
      return this._state === Right
        ? new Either<TL, TRR>(cb(this._value as TR), Right, this._trackId)
        : new Either<TL, TRR>(this._value as TL, Left, this._trackId);
    } catch (e) {
      const either = new Either<TL, TRR>(
        this._value as TL,
        Left,
        this._trackId,
      );
      either._error = e as Error;
      return either;
    }
  }

  async amapLeft<TLL>(cb: (v: TL) => Promise<TLL>): Promise<Either<TLL, TR>> {
    try {
      return this._state === Left
        ? new Either<TLL, TR>(await cb(this._value as TL), Left, this._trackId)
        : new Either<TLL, TR>(this._value as TR, Right, this._trackId);
    } catch (e) {
      const either = new Either<TLL, TR>(
        this._value as TR,
        Right,
        this._trackId,
      );
      either._error = e as Error;
      return either;
    }
  }

  async amapRight<TRR>(cb: (v: TR) => Promise<TRR>): Promise<Either<TL, TRR>> {
    try {
      return this._state === Right
        ? new Either<TL, TRR>(await cb(this._value as TR), Right, this._trackId)
        : new Either<TL, TRR>(this._value as TL, Left, this._trackId);
    } catch (e) {
      const either = new Either<TL, TRR>(
        this._value as TL,
        Left,
        this._trackId,
      );
      either._error = e as Error;
      return either;
    }
  }

  fmapLeft<TLL>() {
  }

  fmapRight<TRR>() {
  }

  async afmapLeft<TLL>() {
  }

  async afmapRight<TRR>() {
  }

  /**
   * This method is used to check if the Either is a Left.
   * @returns {boolean} - Returns true if the Either is a Left.
   */
  hasLeft(): boolean {
    return this._state === Left;
  }

  /**
   * This method is used to check if the Either is a Right.
   * @returns {boolean} - Returns true if the Either is a Right.
   */
  hasRigt(): boolean {
    return this._state === Right;
  }

  /**
   * This method is used to create a Either of type Left.
   * @param value - The value to be contained in the Either.
   * @returns {Either} - Returns a Either of type Left.
   * @example
   * const either = Either.left<number, string>("Hello!");
   * console.log(either); // Either { value: "Hello!" }
   */
  static left<TL, TR>(value: TL): Either<TL, TR> {
    return new Either<TL, TR>(value, Left);
  }

  /**
   * This method is used to create a Either of type Right.
   * @param value - The value to be contained in the Either.
   * @returns {Either} - Returns a Either of type Right.
   * @example
   * const either = Either.right<number, string>(1);
   * console.log(either); // Either { value: 1 }
   */
  static right<TL, TR>(value: TR): Either<TL, TR> {
    return new Either<TL, TR>(value, Right);
  }
}

export type PromisesEither<TL, TR> = Promise<Either<TL, TR>>;
