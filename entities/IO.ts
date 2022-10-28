import { ContainerAbstraction } from "./Container.ts";

export abstract class IOAbstraction extends ContainerAbstraction<unknown> {

}

export class IO extends IOAbstraction {
  protected extract(): unknown {
    throw new Error("Method not implemented.");
  }
}
