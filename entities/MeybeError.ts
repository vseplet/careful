import { Maybe } from "./Maybe.ts";

export class MaybeError extends Maybe<Error> {
  isError(): boolean {
    return this._value !== null;
  }

  extractError(): Error {
    return this._value as Error;
  }
}


export type PromisesMaybeError = Promise<MaybeError>
