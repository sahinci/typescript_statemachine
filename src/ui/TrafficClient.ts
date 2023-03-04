import { StateMachine } from "../logic/StateMachine.js";
import { State } from "../logic/State.js";
import { CarState as CarState } from "../logic/enums/CarState.js";
import { TrafficLightTransition as TrafficLightTransition } from "../logic/enums/TrafficLightTransition.js";
import { TransitionBuilder } from "../logic/TransitionBuilder.js";
import { ITraffic } from "./ITraffic.js";

export class TrafficClient implements ITraffic<CarState, TrafficLightTransition> {


  private stateMachine = new StateMachine<CarState, TrafficLightTransition>();

  populateSates() {
    for (let state in CarState) {
      if (Number(state) || state == '0') {
        let stateItem = new State<CarState, TrafficLightTransition>();
        stateItem.stateName = state.toString();
        this.stateMachine.populateStates(stateItem);
      }
    }

    this.setInitialState();
  }

  private setInitialState() {
    let iniState: State<CarState, TrafficLightTransition> = new State<CarState, TrafficLightTransition>();
    iniState.onEntry(() => { this.showStopTrafficUi(); this.redOn(); this.yellowOff(); this.greenOff(); });
    iniState.onExit(() => { this.redOff(); this.yellowOn(); this.greenOff(); });
    iniState.stateName = CarState.Stop.toString();
    this.stateMachine.defineInitialState(iniState);
  }

  configureStateMachine() {

    this.stateMachine.configure(CarState.Stop)
      .onEntry(() => { this.showStopTrafficUi(); this.redOn(); this.yellowOff(); this.greenOff(); })
      .onExit(() => { this.redOff(); this.yellowOn(); this.greenOff(); })
      .permit(new TransitionBuilder<CarState, TrafficLightTransition>()
        .setTargetTransition(TrafficLightTransition.Yellow).setNextState(CarState.BeReady).build());

    this.stateMachine.configure(CarState.BeReady)
      .onEntry(() => { this.showTrafficReadyForGoUi(); this.yellowOn(); this.redOff(); this.greenOff(); })
      .onExit(() => { this.yellowOff(); this.redOff(); this.greenOn(); })
      .permit(new TransitionBuilder<CarState, TrafficLightTransition>()
        .setTargetTransition(TrafficLightTransition.Green).setNextState(CarState.Go).build());

    this.stateMachine.configure(CarState.Go)
      .onEntry(() => { this.shwoTrafficGoingUi(); this.greenOn(); this.redOff(); this.yellowOff(); })
      .onExit(() => { this.greenOff(); this.redOn(); this.yellowOff(); })
      .permit(new TransitionBuilder<CarState, TrafficLightTransition>()
        .setTargetTransition(TrafficLightTransition.Red).setNextState(CarState.Stop).build());
  }

  fire(transitionName: TrafficLightTransition): State<CarState, TrafficLightTransition> {
    return this.stateMachine.fire(transitionName)
  }

  showStopTrafficUi() {
    console.log("traffic stopping");
  }
  showTrafficReadyForGoUi() {
    console.log("traffic be ready to go");
  }
  shwoTrafficGoingUi() {
    console.log("traffic going");
  }
  redOff() {
    console.log("red light off")
  }
  yellowOff() {
    console.log("yellow light off")
  }
  greenOff() {
    console.log("green light off")
  }
  redOn() {
    console.log("red light on")
  }
  yellowOn() {
    console.log("yellow light on")
  }
  greenOn() {
    console.log("green light on")
  }
}


