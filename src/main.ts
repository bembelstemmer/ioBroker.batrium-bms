/*
 * Created with @iobroker/create-adapter v2.3.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from "@iobroker/adapter-core";
import dgram from "node:dgram";
import Parser from "binary-parser";


// Load your modules here, e.g.:
// import * as fs from "fs";

class BatriumBms extends utils.Adapter {

    private server: dgram.Socket;

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: "batrium-bms",
        });
        this.on("ready", this.onReady.bind(this));
        // this.on("stateChange", this.onStateChange.bind(this));
        // this.on("objectChange", this.onObjectChange.bind(this));
        // this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));

        this.server = dgram.createSocket({ type: "udp4" });
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {

        this.server.on("error", this.onServerError.bind(this));
        this.server.on("listening", this.onServerListening.bind(this));
        this.server.on("message", this.onServerMessage.bind(this));
        this.server.on("close", this.onServerClose.bind(this));
        this.server.bind(18542);

        // Reset the connection indicator during startup
        this.setState("info.connection", false, true);

        // The adapters config (in the instance object everything under the attribute "native") is accessible via
        // this.config:
        this.log.info("config option1: " + this.config.option1);
        this.log.info("config option2: " + this.config.option2);

        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
        */
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

        // In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
        this.subscribeStates("testVariable");
        // You can also add a subscription for multiple states. The following line watches all states starting with "lights."
        // this.subscribeStates("lights.*");
        // Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
        // this.subscribeStates("*");

        /*
            setState examples
            you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
        */
        // the variable testVariable is set to true as command (ack=false)
        await this.setStateAsync("testVariable", true);

        // same thing, but the value is flagged "ack"
        // ack should be always set to true if the value is received from or acknowledged from the target system
        await this.setStateAsync("testVariable", { val: true, ack: true });

        // same thing, but the state is deleted after 30s (getState will return null afterwards)
        await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

        // examples for the checkPassword/checkGroup functions
        //let result = await this.checkPasswordAsync("admin", "iobroker");
        //this.log.info("check user admin pw iobroker: " + result);

        //result = await this.checkGroupAsync("admin", "admin");
        //this.log.info("check group user admin group admin: " + result);
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

    /**
     * Is called if a subscribed state changes
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted`);
        }
    }

    private onServerMessage(msg: Buffer, info: dgram.RemoteInfo): void {
        this.log.info("MSG received");
    }

    private async onServerListening(): Promise<void> {
        const address = this.server.address();
        const port = address.port;
        const ipaddr = address.address;
        this.log.info(`UDP Listening started on ${ipaddr}:${port}`);
    }

    private async onServerClose(): Promise<void> {
        this.log.info("UDP Listener Port closed.");
    }

    private onServerError(error: Error): void {
        this.log.error("Error in listener: " + error.message);
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