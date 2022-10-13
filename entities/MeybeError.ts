import { MaybeAbstracton } from "./Maybe.ts";
import { MonadAbstraction } from "./Monad.ts";

export class MaybeError extends MaybeAbstracton<Error> {
  protected isJust(): boolean {
    throw new Error("Method not implemented.");
  }

  protected isNothing(): boolean {
    throw new Error("Method not implemented.");
  }

  protected map<X>(
    cb: (v: Error) => X,
  ): MaybeError {
    throw new Error("Method not implemented.");
  }

  protected amap<X>(
    md: MonadAbstraction<(v: Error) => X, (v: Error) => X>,
  ): MaybeError {
    throw new Error("Method not implemented.");
  }

  protected fmap<X>(
    cb: (
      v: Error,
    ) => MaybeError,
  ): MaybeError {
    throw new Error("Method not implemented.");
  }

  protected extract(): Error | null {
    throw new Error("Method not implemented.");
  }
}


export type PromisesMaybeError = Promise<MaybeError>
