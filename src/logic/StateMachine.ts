import { State } from "./State.js";

export class StateMachine<TState, TTransition> {

  private currentState: State<TState, TTransition> = new State<TState, TTransition>();
  private stateList: State<TState, TTransition>[] = [];


  defineInitialState(initialState: State<TState, TTransition>) {
    this.currentState = initialState;
  }

  populateStates(state: State<TState, TTransition>) {
    this.stateList.push(state);
  }

  configure(state: TState) {
    return this.stateList.find(p => p.stateName == state.toString());
  }

  
  fire(transition: TTransition): State<TState, TTransition> {
    let trans = this.stateList.find(p => p.stateName.toString() == this.currentState.stateName.toString())
      .transitions.find(p => p.getTargetTransition == transition);
    if (trans) {
      this.currentState.executeOnExit();
      let nextSt = this.stateList.find(p => p.stateName == trans.getNextState.toString());
      this.currentState = nextSt;
      this.currentState.executeOnEnter()
      return this.currentState;
    }
  }
}
