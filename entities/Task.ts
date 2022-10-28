import { ContainerAbstraction } from "./Container.ts";

export abstract class TaskAbstraction extends ContainerAbstraction<unknown> {

}

export class Task extends TaskAbstraction {
  protected extract(): unknown {
    throw new Error("Method not implemented.");
  }
}
