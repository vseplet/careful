import { MonadAbstraction } from "./Monad.ts";

export enum EitherState {
  Left,
  Right,
}
export abstract class EitherAbstraction<TL, TR>
  extends MonadAbstraction<TL, TR> {
}

export class Either<TL, TR> extends MonadAbstraction<TL, TR> {
  constructor(value: TL | TR, trackId: number | null = null) {
    super(value, trackId);
  }

  protected map<X>(
    cb: (v: TL | TR) => X,
  ): Either<X, TR> | Either<TL, X> {
    throw new Error("Method not implemented.");
  }

  protected amap<X>(
    md: Either<(v: TL) => X, (v: TR) => X>,
  ): Either<X, TR> | Either<TL, X> {
    throw new Error("Method not implemented.");
  }

  protected fmap<X>(
    cb: (v: TL | TR) => Either<X, TR> | Either<TL, X>,
  ): Either<X, TR> | Either<TL, X> {
    throw new Error("Method not implemented.");
  }

  protected extract(): TL | TR | null {
    throw new Error("Method not implemented.");
  }
}

export type PromisesEither<TL, TR> = Promise<Either<TL, TR>>
