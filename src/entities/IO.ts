import { Container } from './Container.ts';

export type Effect<T> = () => T;
export type AsyncEffect<T> = () => Promise<T>;

// export class IO<T> extends ContainerAbstraction<T, T> {
// }

export class IO<A> {
  private effect: Effect<A>;

  constructor(effect: Effect<A>) {
    this.effect = effect;
  }

  static of<T>(val: T) {
    return new IO(() => val);
  }

  map<B>(f: (val: A) => B): IO<B> {
    return new IO(() => f(this.effect()));
  }

  fmap<B>(f: (val: A) => IO<B>): IO<B> {
    return new IO(() => f(this.effect()).effect());
  }

  execute() {
    return this.effect();
  }

  async executeAsnyc() {
    return this.effect();
  }
}
