import { Either, EitherState } from "./Either.ts";

export class EitherError<T> extends Either<Error, T> {
  isError(): boolean {
    return this._direction === EitherState.Left
  }

  isValue(): boolean {
    return this._direction === EitherState.Right
  }
}

export type PromisesEitherError<T> = Promise<EitherError<T>>
