import { NullOr } from '../base.ts';
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

  mapLeft() {
  }

  mapRight() {
  }

  async amapLeft() {
  }

  async amapRight() {
  }

  fmapLeft() {
  }

  fmapRight() {
  }

  async afmapLeft() {
  }

  async afmapRight() {
  }

  hasLeft(): boolean {
    return this._state === Left;
  }

  hasRigt(): boolean {
    return this._state === Right;
  }

  static left<TL, TR>(value: TL): Either<TL, TR> {
    return new Either<TL, TR>(value, Left);
  }

  static right<TL, TR>(value: TR): Either<TL, TR> {
    return new Either<TL, TR>(value, Right);
  }
}

export type PromisesEither<TL, TR> = Promise<Either<TL, TR>>;

const data = Either.left<number, number>(10);

data.fmapLeft();
