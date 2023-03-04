import { State } from "src/logic/State.js";
import { TrafficLightTransition } from "../logic/enums/TrafficLightTransition";

export interface ITraffic<TState, TTransition> {
    populateSates(): void;
    configureStateMachine(): void;
    fire(transitionAction: TrafficLightTransition): State<TState, TTransition>;
}