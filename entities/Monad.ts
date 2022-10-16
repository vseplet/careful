import { ContainerAbstraction } from "./Container.ts";

export abstract class MonadAbstraction<A, B>
  extends ContainerAbstraction<A | B> {

  protected abstract x<X>(
    cb: (v: A | B) => X,
  ):
    | MonadAbstraction<X | A, X | B>
    | MonadAbstraction<X, B>
    | MonadAbstraction<A, X>;

  protected abstract y<X>(
    md: MonadAbstraction<(v: A) => X, (v: B) => X>,
  ):
    | MonadAbstraction<X | A, X | B>
    | MonadAbstraction<X, B>
    | MonadAbstraction<A, X>;

  protected abstract z<X>(
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

  protected abstract ax<X>(
    cb: (v: A | B) => Promise<X>,
  ):
    Promise<| MonadAbstraction<A | X, B | X>
      | MonadAbstraction<X, B>
      | MonadAbstraction<A, X>>

  protected abstract ay<X>(
    md: Promise<MonadAbstraction<(v: A) => X, (v: B) => X>>,
  ):
      | Promise<MonadAbstraction<A | X, B | X>>
      | Promise<MonadAbstraction<X, B>>
      | Promise<MonadAbstraction<A, X>>

  // protected abstract az<X>(
  //   cb: (
  //     v: A | B,
  //   ) => Promise<
  //     | MonadAbstraction<X | A, X | B>
  //     | MonadAbstraction<X, B>
  //     | MonadAbstraction<A, X>
  //   >,
  // ):
  //     | Promise<MonadAbstraction<A | X, B | X>>
  //     | Promise<MonadAbstraction<X, B>>
  //     | Promise<MonadAbstraction<A, X>>
}
