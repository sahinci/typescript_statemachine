import { TrafficClient } from '../../src/ui/TrafficClient';
import { ITraffic } from "../../src/ui/ITraffic";
import { CarState } from '../../src/logic/enums/CarState';
import { TrafficLightTransition } from '../../src/logic/enums/TrafficLightTransition';


let client: ITraffic<CarState, TrafficLightTransition>;
beforeEach(() => {
    client = new TrafficClient();
    client.populateSates();
    client.configureStateMachine();
});

test('red light stop test ', () => {
    let yellowLight = client.fire(TrafficLightTransition.Yellow);
    expect('1').toBe(yellowLight.stateName);
});

test('yellow light test ', () => {
    let yellowLight = client.fire(TrafficLightTransition.Yellow);
    let greenLight = client.fire(TrafficLightTransition.Green);
    expect('2').toBe(greenLight.stateName);
});

test('green light test ', () => {
    let yellowLight = client.fire(TrafficLightTransition.Yellow);
    let greenLight = client.fire(TrafficLightTransition.Green);
    let redLight = client.fire(TrafficLightTransition.Red);
    expect('0').toBe(redLight.stateName);
});