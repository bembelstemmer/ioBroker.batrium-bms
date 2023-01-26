/*
 * Created with @iobroker/create-adapter v2.3.0
 */

import * as utils from "@iobroker/adapter-core";
import dgram from "node:dgram";
import { ParserFacade } from "./lib/parsers/parser-facade";
import { MessageBaseData } from "./lib/parsers/parser-base-data";

class BatriumBms extends utils.Adapter {

    private server: dgram.Socket;
    private parserFacade: ParserFacade;

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: "batrium-bms",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("unload", this.onUnload.bind(this));

        this.server = dgram.createSocket({ type: "udp4" });
        this.parserFacade = new ParserFacade(this);
    }

    private async onReady(): Promise<void> {

        this.setState("info.connection", false, true);

        this.server.on("error", this.onServerError.bind(this));
        this.server.on("listening", this.onServerListening.bind(this));
        this.server.on("message", this.onServerMessage.bind(this));
        this.server.on("close", this.onServerClose.bind(this));
        this.server.bind(parseInt(this.config.bindingport), this.config.bindingaddress);

        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables

        await this.setObjectNotExistsAsync("testVariable", {
            type: "state",
            common: {
                name: "testVariable",
                type: "boolean",
                role: "indicator",
                read: true,
                write: true,
            },
            native: {},
        });
        */

        // In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
        // this.subscribeStates("testVariable");
        // You can also add a subscription for multiple states. The following line watches all states starting with "lights."
        // this.subscribeStates("lights.*");
        // Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
        // this.subscribeStates("*");

        // the variable testVariable is set to true as command (ack=false)
        // await this.setStateAsync("testVariable", true);

        // same thing, but the value is flagged "ack"
        // ack should be always set to true if the value is received from or acknowledged from the target system
        // await this.setStateAsync("testVariable", { val: true, ack: true });

        // same thing, but the state is deleted after 30s (getState will return null afterwards)
        // await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            this.server.close();
            callback();
        } catch (e) {
            callback();
        }
    }

    private onServerMessage(msg: Buffer, info: dgram.RemoteInfo): void {
        const data: MessageBaseData = this.parserFacade.getMessageBaseData(msg);
        this.log.debug(`MSG received from ${ info.address } MessageID:${ data.MessageId } SystemID:${ data.SystemId }`);
        this.parserFacade.handleMessage(data.SystemId, data.MessageId, msg);
    }

    private async onServerListening(): Promise<void> {
        const address = this.server.address();
        const port = address.port;
        const ipaddr = address.address;
        this.log.info(`UDP Listening started on ${ipaddr}:${port}`);
        this.setState("info.connection", true, true);
    }

    private async onServerClose(): Promise<void> {
        this.log.info("UDP Listener Port closed.");
    }

    private onServerError(error: Error): void {
        this.log.error("Error in listener: " + error.message);
        this.setState("info.connection", false, true);
        this.restart();
    }

}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new BatriumBms(options);
} else {
    // otherwise start the instance directly
    (() => new BatriumBms())();
}