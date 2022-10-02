export type NullOr<T> = T | null;
export type NullOrUndefined = null | undefined;
export type NullOrUndefinedOr<T> = NullOr<T> | undefined;
export type NonNullable<T> = Exclude<T, null | undefined>;
export type PromiseNullOr<T> = Promise<NullOr<T>>;
export type ErrorOr<T> = Error | T;
export type PromiseErrorOr<T> = Promise<ErrorOr<T>>;
