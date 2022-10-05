import { Either, Maybe } from "../mod.ts";

console.log(Maybe.just<number>(10));
console.log(Either.left<number, number>(10));
