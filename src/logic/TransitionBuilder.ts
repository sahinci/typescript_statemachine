import { Transition } from "./Transition.js";

export class TransitionBuilder<TState, TTransition>
{
    private transitionFrom: TTransition;
    private nextState: TState;
    private permit: () => boolean;
    private action: () => void;

    get getNextState(): TState {
        return this.nextState;
    }

    setNextState(state: TState): TransitionBuilder<TState, TTransition> {
        this.nextState = state;
        return this;
    }

    get getTargetTransition(): TTransition {
        return this.transitionFrom;
    }

    setTargetTransition(transitionFrom: TTransition): TransitionBuilder<TState, TTransition> {
        this.transitionFrom = transitionFrom;
        return this;
    }
    get getPermit(): () => boolean {
        return this.permit;
    }

    setPermit(permit: () => boolean): TransitionBuilder<TState, TTransition> {
        this.permit = permit;
        return this;
    }

    get getAction(): () => void {
        return this.action;
    }

    setAction(action: () => void): TransitionBuilder<TState, TTransition> {
        this.action = action;
        return this;
    }

    build(): Transition<TState, TTransition> {
        return new Transition(this);
    }
}