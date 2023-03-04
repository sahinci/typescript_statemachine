import { MobilePhoneClient } from "./MobilePhoneClient.js";
import { TrafficClient } from "./TrafficClient.js";

export class ClientFactory {


    //this method can return other kind of clients with argument.  
    static createClient() {
        return new MobilePhoneClient();
    }
    static createTrafficClient() {
        return new TrafficClient();
    }
}