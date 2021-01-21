import { TransitionBuilder } from "./TransitionBuilder.js";

export class Transition<TState, TTransition> {

  private nextState: TState;
  private targetTransition: TTransition;
  private permit: () => boolean;
  private action: () => void;

  constructor(builder: TransitionBuilder<TState, TTransition>) {

    this.targetTransition = builder.getTargetTransition;
    this.nextState = builder.getNextState;
    this.permit = builder.getPermit;
    this.action = builder.getAction;
  }

  public get getTargetTransition() {
    return this.targetTransition;
  }

  public get getNextState() {
    return this.nextState;
  }
}
