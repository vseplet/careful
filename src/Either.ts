import { v1 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
import { NonNullable, NullOr, NullOrUndefined } from "./base.ts";
import { Maybe } from "./Maybe.ts";

interface IEither<T0, T1> {
  _traceId: string;
  _left: NullOr<T0>;
  _right: NullOr<T1>;
}

abstract class AEither<T0, T1> implements IEither<T0, T1> {
  abstract _left: NullOr<T0>;
  abstract _right: NullOr<T1>;
  abstract _traceId: string;
  abstract _maybeLeft: Maybe<T0>;
  abstract _maybeRight: Maybe<T1>;
  abstract left: Maybe<T0>;
  abstract right: Maybe<T1>;
}

type TLeftOrRight<T0, T1> = [T0, NullOrUndefined] | [NullOrUndefined, T1];
type TWarpCallback<T0, T1> = () => TLeftOrRight<T0, T1>;
type TWarpAsyncCallback<T0, T1> = () => Promise<TLeftOrRight<T0, T1>>;

export class Either<T0, T1> implements AEither<T0, T1> {
  _traceId: string;
  _maybeLeft: Maybe<T0>;
  _maybeRight: Maybe<T1>;
  _left: NullOr<T0>;
  _right: NullOr<T1>;

  constructor(
    values: TLeftOrRight<T0, T1>,
    traceId: string = "",
  ) {
    this._traceId = traceId || v1.generate().toString();
    this._left = values[0] === undefined ? null : values[0];
    this._right = values[1] === undefined ? null : values[1];
    this._maybeLeft = Maybe.is<T0>(this._left);
    this._maybeRight = Maybe.is<T1>(this._right);
  }

  public get left(): Maybe<T0> {
    return this._maybeLeft;
  }

  public get right(): Maybe<T1> {
    return this._maybeRight;
  }

  static is<T0, T1>(values: TLeftOrRight<T0, T1>) {
    return new Either<T0, T1>(values);
  }

  static isRight<T>(value: NonNullable<T>): AEither<null, T> {
    return new Either<null, T>([null, value]);
  }

  static isLeft<T>(value: NonNullable<T>): AEither<T, null> {
    return new Either<T, null>([value, null]);
  }

  static wrap<T0, T1>(cb: TWarpCallback<T0, T1>): Maybe<AEither<T0, T1>> {
    try {
      return Maybe.is<AEither<T0, T1>>(Either.is<T0, T1>(cb()));
    } catch (e: unknown) {
      console.error(e);
      return Maybe.is<AEither<T0, T1>>(null);
    }
  }

  static async awrap<T0, T1>(
    cb: TWarpAsyncCallback<T0, T1>,
  ): Promise<Maybe<AEither<T0, T1>>> {
    try {
      return Maybe.is<AEither<T0, T1>>(Either.is<T0, T1>(await cb()));
    } catch (e: unknown) {
      console.error(e);
      return Maybe.is<AEither<T0, T1>>(null);
    }
  }
}
