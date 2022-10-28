import { NullOr } from "./base.ts";
import { ContainerAbstraction } from "./Container.ts";

export enum EitherState {
  Left,
  Right,
}

export abstract class EitherAbstraction<TL, TR> extends ContainerAbstraction<TL, TR> {
}

export class Either<TL, TR> extends EitherAbstraction<TL, TR> {
  protected _direction: EitherState;

  constructor(value: TL | TR, dir: EitherState, trackId: NullOr<number> = null) {
    super(value, trackId);
    this._direction = dir;
  }

  isLeft(): boolean {
    return this._direction === EitherState.Left;
  }

  isRigt(): boolean {
    return this._direction === EitherState.Right;
  }

  extract(): TL | TR {
    return this._value;
  }

  extractLeft(): TL {
    return this._value as TL;
  }

  extractRight(): TR {
    return this._value as TR;
  }

  static left<TL, TR>(value: TL): Either<TL, TR> {
    return new Either<TL, TR>(value, EitherState.Left);
  }

  static right<TL, TR>(value: TR): Either<TL, TR> {
    return new Either<TL, TR>(value, EitherState.Right );
  }
}

export type PromisesEither<TL, TR> = Promise<Either<TL, TR>>
