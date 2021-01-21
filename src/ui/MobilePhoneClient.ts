import { StateMachine } from "../logic/StateMachine.js";
import { State } from "../logic/State.js";
import { StateName } from "../logic/enums/StateEnums.js";
import { TransitionActionName } from "../logic/enums/TransitionEnums.js";
import { TransitionBuilder } from "../logic/TransitionBuilder.js";
import { IClient } from "./IClient.js";

export class MobilePhoneClient implements IClient<StateName,TransitionActionName> {


  private stateMachine = new StateMachine<StateName, TransitionActionName>();

  populateSates() {
    for (let state in StateName) {
      if (Number(state) || state == '0') {
        let stateItem = new State<StateName, TransitionActionName>();
        stateItem.stateName = state.toString();
        this.stateMachine.populateStates(stateItem);
      }
    }

    this.setInitialState();
  }

  private setInitialState() {
    let iniState: State<StateName, TransitionActionName> = new State<StateName, TransitionActionName>();
    iniState.onEntry(() => { this.showWaitingCallUi() });
    iniState.onExit(() => { this.hideWaitingCallUi() });
    iniState.stateName = StateName.AvailableForNewCall.toString();
    this.stateMachine.defineInitialState(iniState);
  }

  configureStateMachine() {

    this.stateMachine.configure(StateName.AvailableForNewCall)
      .onEntry(() => { this.showWaitingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<StateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.CallReachedStartRinging).setNextState(StateName.Ringing).build());

    this.stateMachine.configure(StateName.Ringing)
      .onEntry(() => { this.showRingingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<StateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedAnswerCall).setNextState(StateName.Answered).build())
      .permit(new TransitionBuilder<StateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedReject).setNextState(StateName.AvailableForNewCall).build());

    this.stateMachine.configure(StateName.Answered)
      .onEntry(() => { this.showWaitingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<StateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedTerminateCall).setNextState(StateName.AvailableForNewCall).build());
  }

  // fireRinging() {
  //   this.fire(TransitionActionName.CallReachedStartRinging);
  // }
  // fireAnswer() {
  //   this.fire(TransitionActionName.ClickedAnswerCall);
  // }
  // fireTerminate() {
  //   this.fire(TransitionActionName.ClickedTerminateCall);
  // }
  calculate(number1: number, number2: number): number {
    return number1 + number2;
  }
  fire(transitionName: TransitionActionName): State<StateName, TransitionActionName> {
    return this.stateMachine.fire(transitionName)
  }

  showWaitingCallUi() {
    console.log("show waiting call");
  }
  hideWaitingCallUi() {
    console.log("hide waiting call");
  }
  showRingingCallUi() {
    console.log("show ringing a new call");
  }
  hideRingingCallUi() {
    console.log("hide ringing");
  }

}




export function sayHelloWithFunction() {
  console.log("say hello");
  return "say hello";
}