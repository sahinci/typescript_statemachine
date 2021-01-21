import { MobilePhoneClient } from "./MobilePhoneClient.js";

export class ClientFactory {

    
    //this method can return other kind of clients with argument.  
    static createClient() {
        return new MobilePhoneClient();
    }
}