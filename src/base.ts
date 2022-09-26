export type Nothing = null;
export type Just<T> = T;
export type NothingOrJust<T> = Nothing | Just<T>;
export type NullOr<T> = T | null;
export type NullOrUndefined = null | undefined;
export type NullOrUndefinedOr<T> = NullOr<T> | undefined;
export type NonNullable<T> = Exclude<T, null | undefined>;

export type PromiseNullOr<T> = Promise<NullOr<T>>;

export type ErrorOr<T> = Error | T;

export type PromiseErrorOr<T> = Promise<ErrorOr<T>>;

export abstract class AEntity {
  abstract _flowId: string;
  abstract toJSON: string;
  static fromJSON: string;
}
