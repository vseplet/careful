import { Either } from "./Either.ts";

export class EitherError<T> extends Either<Error, T> {
}

export type PromisesEitherError<T> = Promise<EitherError<T>>
