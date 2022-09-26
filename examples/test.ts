import { Either, Maybe } from "../mod.ts";

console.log(Maybe.is<number>(10));
console.log(Either.isLeft<number>(10).left.map((n) => n * 2));
