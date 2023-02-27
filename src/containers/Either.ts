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

  mapLeft<TLL>() {
  }

  mapRight<TRR>() {
  }

  async amapLeft<TLL>() {
  }

  async amapRight<TRR>() {
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
