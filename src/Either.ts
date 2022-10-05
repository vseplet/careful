import { MonadAbstraction } from "./Monad.ts";

export enum EitherState {
  Left,
  Right,
}
export abstract class EitherAbstraction<TL, TR>
  extends MonadAbstraction<TL, TR> {
}

export class Either<TL, TR> extends MonadAbstraction<TL, TR> {
  protected map<X>(
    cb: (v: TL | TR) => X,
  ): Either<TL | X, TR | X> {
    throw new Error("Method not implemented.");
  }

  protected amap<X>(
    md: Either<(v: TL) => X, (v: TR) => X>,
  ): Either<TL | X, TR | X> {
    throw new Error("Method not implemented.");
  }

  protected fmap<X>(
    cb: (v: TL | TR) => Either<TL | X, TR | X>,
  ): Either<TL | X, TR | X> {
    throw new Error("Method not implemented.");
  }

  extract(): TL | TR | null {
    throw new Error("Method not implemented.");
  }
}
