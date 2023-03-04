import { StateMachine } from "../logic/StateMachine.js";
import { State } from "../logic/State.js";
import { PhoneCallStateName } from "../logic/enums/PhoneCallStateName.js";
import { TransitionActionName } from "../logic/enums/PhoneCallTransitionsEnum.js";
import { TransitionBuilder } from "../logic/TransitionBuilder.js";
import { IClient as IMobilePhoneClient } from "./IMobilePhoneClient.js";

export class MobilePhoneClient implements IMobilePhoneClient<PhoneCallStateName, TransitionActionName> {


  private stateMachine = new StateMachine<PhoneCallStateName, TransitionActionName>();

  populateSates() {
    for (let state in PhoneCallStateName) {
      if (Number(state) || state == '0') {
        let stateItem = new State<PhoneCallStateName, TransitionActionName>();
        stateItem.stateName = state.toString();
        this.stateMachine.populateStates(stateItem);
      }
    }

    this.setInitialState();
  }

  private setInitialState() {
    let iniState: State<PhoneCallStateName, TransitionActionName> = new State<PhoneCallStateName, TransitionActionName>();
    iniState.onEntry(() => { this.showWaitingCallUi() });
    iniState.onExit(() => { this.hideWaitingCallUi() });
    iniState.stateName = PhoneCallStateName.AvailableForNewCall.toString();
    this.stateMachine.defineInitialState(iniState);
  }

  configureStateMachine() {

    this.stateMachine.configure(PhoneCallStateName.AvailableForNewCall)
      .onEntry(() => { this.showWaitingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<PhoneCallStateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.CallReachedStartRinging).setNextState(PhoneCallStateName.Ringing).build());

    this.stateMachine.configure(PhoneCallStateName.Ringing)
      .onEntry(() => { this.showRingingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<PhoneCallStateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedAnswerCall).setNextState(PhoneCallStateName.Answered).build())
      .permit(new TransitionBuilder<PhoneCallStateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedReject).setNextState(PhoneCallStateName.AvailableForNewCall).build());

    this.stateMachine.configure(PhoneCallStateName.Answered)
      .onEntry(() => { this.showWaitingCallUi() })
      .onExit(() => { this.hideRingingCallUi() })
      .permit(new TransitionBuilder<PhoneCallStateName, TransitionActionName>()
        .setTargetTransition(TransitionActionName.ClickedTerminateCall).setNextState(PhoneCallStateName.AvailableForNewCall).build());
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
  fire(transitionName: TransitionActionName): State<PhoneCallStateName, TransitionActionName> {
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