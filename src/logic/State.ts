import { Transition } from "./Transition.js";

/**
 * Represents a state in a state machine.
 * @template TState The type of the state.
 * @template TTransition The type of the transition.
 */
export class State<TState, TTransition> {

  /** An array of transitions from this state. */
  transitions: Transition<TState, TTransition>[] = [];

  /** The name of this state. */
  stateName: string;

  /** A function to be called when entering this state. */
  private onEnterCallBack: (() => void) | undefined;

  /** A function to be called when exiting this state. */
  private onExitCallBack: (() => void) | undefined;

  /**
   * Creates a new instance of the State class.
   * Initializes the state name to the string representation of this instance.
   */
  constructor() {
    this.stateName = this.toString();
  }

  /**
   * Adds a transition from this state.
   * @param transition The transition to add.
   * @returns This state object to support method chaining.
   */
  permit(transition: Transition<TState, TTransition>): State<TState, TTransition> {
    this.transitions.push(transition);
    return this;
  }

  /**
   * Adds a transition from this state if a condition is met.
   * @param transition The transition to add.
   * @param permitCondition A function that determines whether the transition can be added.
   * @returns This state object to support method chaining.
   */
  permitIf(transition: Transition<TState, TTransition>, permitCondition: (arg: boolean) => boolean): State<TState, TTransition> {
    if (permitCondition.apply(this, arguments)) {
      this.transitions.push(transition);
      return this;
    }
  }

  /**
   * Sets a function to be called when entering this state.
   * @param onEnterCallBack The function to be called.
   * @returns This state object to support method chaining.
   */
  onEntry(onEnterCallBack: () => void) {
    this.onEnterCallBack = onEnterCallBack;
    return this;
  }

  /**
   * Sets a function to be called when exiting this state.
   * @param onExitCallBack The function to be called.
   * @returns This state object to support method chaining.
   */
  onExit(onExitCallBack: () => void) {
    this.onExitCallBack = onExitCallBack;
    return this;
  }

  /**
   * Calls the onEnterCallBack function if it is defined.
   */
  executeOnEnter() {
    if (this.onEnterCallBack) {
      this.onEnterCallBack();
    }
  }

  /**
   * Calls the onExitCallBack function if it is defined.
   */
  executeOnExit() {
    if (this.onExitCallBack) {
      this.onExitCallBack();
    }
  }
}
