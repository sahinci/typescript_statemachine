import { MobilePhoneClient } from '../../src/ui/MobilePhoneClient';
import { IClient } from "../../src/ui/IMobilePhoneClient";
import { PhoneCallStateName } from '../../src/logic/enums/PhoneCallStateName';
import { TransitionActionName } from '../../src/logic/enums/PhoneCallTransitionsEnum';


let client: IClient<PhoneCallStateName, TransitionActionName>;
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