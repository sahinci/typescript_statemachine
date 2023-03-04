import { TransitionBuilder } from "./TransitionBuilder.js";

/**
 * Represents a transition from one state to another state in a state machine.
 * @typeparam TState The type of the states in the state machine.
 * @typeparam TTransition The type of the transitions in the state machine.
 */
export class Transition<TState, TTransition> {

  private nextState: TState;
  private targetTransition: TTransition;
  private permit: () => boolean;
  private action: () => void;

  /**
  * Initializes a new instance of the Transition class with the specified builder.
  * @param builder The builder used to configure the transition.
  */
  constructor(builder: TransitionBuilder<TState, TTransition>) {

    // Set the properties of the transition using the builder
    this.targetTransition = builder.getTargetTransition;
    this.nextState = builder.getNextState;
    this.permit = builder.getPermit;
    this.action = builder.getAction;
  }

  /**
 * Gets the target transition of the transition.
 * @returns The target transition of the transition.
 */
  public get getTargetTransition() {
    return this.targetTransition;
  }

  /**
  * Gets the next state of the transition.
  * @returns The next state of the transition.
  */
  public get getNextState() {
    return this.nextState;
  }
}
