import { State } from "./State.js";
/**
 * This class is a generic state machine which get types State and Transition
 * @template TState The type of the state
 * @template TTransition The type of the transition
 */
export class StateMachine<TState, TTransition> {

  /**Current state  */
  private currentState: State<TState, TTransition> = new State<TState, TTransition>();
  /**State list of the state machine */
  private stateList: State<TState, TTransition>[] = [];


  /**State machine need a initial state for to work.
   *@param initialState the initial sate for set current sate for startup 
   */
  defineInitialState(initialState: State<TState, TTransition>) {
    this.currentState = initialState;
  }

  /**
   * At first all states need populate in state machine
   * @param state the state for put in state list in state machine.
   */
  populateStates(state: State<TState, TTransition>) {
    this.stateList.push(state);
  }

  /**
   * Get state from sate list for configure it.
   * @param state find a sate for configure
   * @returns state for configure
   */
  configure(state: TState) {
    return this.stateList.find(p => p.stateName == state.toString());
  }

  /**
   * Swith state to next desired state with coming transition.
   * Transitions are configured on states.
   * First get current state and fint transition from iths trasition list with transtion param.
   * if there is desirec configured trasition then exit from current state
   * then find target next state from state list. 
   * Next state finding by state name so param transition know next state when it was configured
   * Then set next state as new curernt state.
   * @param transition transition for to change state accofding configureation
   * @returns  current satet.  current state is resolved as new state.
   */
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
