import { Either, EitherState } from "./Either.ts";

export class ErrorEither<T> extends Either<Error, T> {
}
