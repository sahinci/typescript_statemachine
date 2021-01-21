import { Transition } from "./Transition.js";

export class State<TState, TTransition> {

  transitions: Transition<TState, TTransition>[] = [];
  stateName: string;

  private onEnterCallBack: (() => void) | undefined;
  private onExitCallBack: (() => void) | undefined;

  constructor() {
    this.stateName = this.toString();
  }

  

  permit(transition: Transition<TState, TTransition>): State<TState, TTransition> {
    this.transitions.push(transition);
    return this;
  }

  permitIf(transition: Transition<TState, TTransition>, permitCondition: (arg: boolean) => boolean): State<TState, TTransition> {
    if (permitCondition.apply(this, arguments)) {
      this.transitions.push(transition);
      return this;
    }
  }

  onEntry(onEnterCallBack: () => void) {
    this.onEnterCallBack = onEnterCallBack;
    return this;
  }

  onExit(onExitCallBack: () => void) {
    this.onExitCallBack = onExitCallBack;
    return this;
  }

  executeOnEnter() {
    if (this.onEnterCallBack) {
      this.onEnterCallBack();
    }
  }

  executeOnExit() {
    if (this.onExitCallBack) {
      this.onExitCallBack();
    }
  }
}
