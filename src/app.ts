import { StateName } from "./logic/enums/StateEnums.js";
import { TransitionActionName } from "./logic/enums/TransitionEnums.js";
import { ClientFactory } from "./ui/ClientFactory.js";
import { IClient } from "./ui/IClient.js";

let client: IClient<StateName,TransitionActionName>;

client = ClientFactory.createClient();
client.populateSates();
client.configureStateMachine();
client.fire(TransitionActionName.CallReachedStartRinging);
// client.fireRinging();
// client.fireAnswer();

