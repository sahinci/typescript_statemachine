import { State } from "src/logic/State.js";
import { TransitionActionName as PhoneCallTransitionEnum } from "../logic/enums/PhoneCallTransitionsEnum.js";

export interface IClient<TState, TTransition> {
    populateSates(): void;
    configureStateMachine(): void;
    fire(transitionAction: PhoneCallTransitionEnum): State<TState, TTransition>;
}