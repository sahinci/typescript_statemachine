import { Transition } from "./Transition.js";

/**
 * A builder class for creating instances of the `Transition` class.
 * @typeparam TState The type of the states in the state machine.
 * @typeparam TTransition The type of the transitions in the state machine.
 */
export class TransitionBuilder<TState, TTransition>
{
    private transitionFrom: TTransition;
    private nextState: TState;
    private permit: () => boolean;
    private action: () => void;

    /**
     * Gets the next state of the transition.
     * @returns The next state of the transition.
     */
    get getNextState(): TState {
        return this.nextState;
    }

    /**
     * Sets the next state of the transition and returns the builder instance.
     * @param state The next state of the transition.
     * @returns The builder instance.
     */
    setNextState(state: TState): TransitionBuilder<TState, TTransition> {
        this.nextState = state;
        return this;
    }

    /**
     * Gets the target transition of the transition.
     * @returns The target transition of the transition.
     */
    get getTargetTransition(): TTransition {
        return this.transitionFrom;
    }

    /**
     * Sets the target transition of the transition and returns the builder instance.
     * @param transitionFrom The target transition of the transition.
     * @returns The builder instance.
     */
    setTargetTransition(transitionFrom: TTransition): TransitionBuilder<TState, TTransition> {
        this.transitionFrom = transitionFrom;
        return this;
    }

    /**
     * Gets the permit function of the transition.
     * @returns The permit function of the transition.
     */
    get getPermit(): () => boolean {
        return this.permit;
    }

    /**
     * Sets the permit function of the transition and returns the builder instance.
     * @param permit The permit function of the transition.
     * @returns The builder instance.
     */
    setPermit(permit: () => boolean): TransitionBuilder<TState, TTransition> {
        this.permit = permit;
        return this;
    }

    /**
     * Gets the action function of the transition.
     * @returns The action function of the transition.
     */
    get getAction(): () => void {
        return this.action;
    }

    /**
     * Sets the action function of the transition and returns the builder instance.
     * @param action The action function of the transition.
     * @returns The builder instance.
     */
    setAction(action: () => void): TransitionBuilder<TState, TTransition> {
        this.action = action;
        return this;
    }

    /**
     * Builds and returns an instance of the `Transition` class using the current builder configuration.
     * @returns An instance of the `Transition` class.
     */
    build(): Transition<TState, TTransition> {
        return new Transition(this);
    }
}
