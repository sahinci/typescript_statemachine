import { MobilePhoneClient } from '../../src/ui/MobilePhoneClient';
import { IClient } from "../../src/ui/IClient";
import { StateName } from '../../src/logic/enums/StateEnums';
import { TransitionActionName } from '../../src/logic/enums/TransitionEnums';


let client: IClient<StateName, TransitionActionName>;
beforeEach(() => {
    client = new MobilePhoneClient();
    client.populateSates();
    client.configureStateMachine();
});

test('fire ringing test ', () => {
    let result = client.fire(TransitionActionName.CallReachedStartRinging);
    expect('1').toBe(result.stateName);

});

test('fire answer test ', () => {
    let ringingRes = client.fire(TransitionActionName.CallReachedStartRinging);
    let result = client.fire(TransitionActionName.ClickedAnswerCall);
    expect('2').toBe(result.stateName);

});

test('fire terminate test ', () => {
    let resultRinging = client.fire(TransitionActionName.CallReachedStartRinging);
    let resultAnswered = client.fire(TransitionActionName.ClickedAnswerCall);
    let result = client.fire(TransitionActionName.ClickedTerminateCall);
    expect('0').toBe(result.stateName);

});