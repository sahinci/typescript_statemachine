import { CarState } from "./logic/enums/CarState.js";
import { PhoneCallStateName } from "./logic/enums/PhoneCallStateName.js";
import { TransitionActionName as PhoneCallTransitionEnum } from "./logic/enums/PhoneCallTransitionsEnum.js";
import { TrafficLightTransition } from "./logic/enums/TrafficLightTransition.js";
import { ClientFactory } from "./ui/ClientFactory.js";
import { IClient as IMobilePhoneClient } from "./ui/IMobilePhoneClient.js";
import { ITraffic } from "./ui/ITraffic.js";


let phoneClient: IMobilePhoneClient<PhoneCallStateName, PhoneCallTransitionEnum>;
phoneClient = ClientFactory.createClient();
phoneClient.populateSates();
phoneClient.configureStateMachine();
phoneClient.fire(PhoneCallTransitionEnum.CallReachedStartRinging);


let trafficClient: ITraffic<CarState, TrafficLightTransition>;
trafficClient = ClientFactory.createTrafficClient();
trafficClient.populateSates();
trafficClient.configureStateMachine();
trafficClient.fire(TrafficLightTransition.Yellow);
