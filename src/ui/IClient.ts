import { State } from "src/logic/State.js";
import { TransitionActionName } from "../logic/enums/TransitionEnums.js";

export interface IClient<TState, TTransition> {
    populateSates(): void;
    configureStateMachine(): void;
    fire(transitionAction: TransitionActionName): State<TState, TTransition>;
}