import { ContainerAbstraction } from "./Container.ts";

export abstract class MonadAbstraction<A, B>
  extends ContainerAbstraction<A | B> {
  protected abstract map<X>(
    cb: (v: A | B) => X,
  ):
    | MonadAbstraction<X | A, X | B>
    | MonadAbstraction<X, B>
    | MonadAbstraction<A, X>;

  protected abstract amap<X>(
    md: MonadAbstraction<(v: A) => X, (v: B) => X>,
  ):
    | MonadAbstraction<X | A, X | B>
    | MonadAbstraction<X, B>
    | MonadAbstraction<A, X>;

  protected abstract fmap<X>(
    cb: (
      v: A | B,
    ) =>
      | MonadAbstraction<X | A, X | B>
      | MonadAbstraction<X, B>
      | MonadAbstraction<A, X>,
  ):
    | MonadAbstraction<X | A, X | B>
    | MonadAbstraction<X, B>
    | MonadAbstraction<A, X>;
}