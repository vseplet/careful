export type NullOr<T> = T | null | undefined;

export type NonNullable<T> = Exclude<T, null | undefined>;

export type PromiseNullOr<T> = Promise<NullOr<T>>;

export type ErrorOr<T> = Error | T;

export type PromiseErrorOr<T> = Promise<ErrorOr<T>>;

export type Constructor<C> = new () => C;

export type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest
  : never;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
