import * as utils from "@iobroker/adapter-core";
import dgram from "node:dgram";
import { ParserFacade } from "./lib/parsers/parser-facade";
import type { MessageBaseData } from "./lib/parsers/parser-base-data";

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

    private onReady(): void {
        void this.setState("info.connection", false, true);

        this.server.on("error", this.onServerError.bind(this));
        this.server.on("listening", this.onServerListening.bind(this));
        this.server.on("message", this.onServerMessage.bind(this));
        this.server.on("close", this.onServerClose.bind(this));
        this.server.bind(parseInt(this.config.bindingport), this.config.bindingaddress);
    }

    private onUnload(callback: () => void): void {
        try {
            this.server.close();
            callback();
        } catch {
            callback();
        }
    }

    private onServerMessage(msg: Buffer, info: dgram.RemoteInfo): void {
        const data: MessageBaseData = this.parserFacade.getMessageBaseData(msg);
        this.log.silly(`MSG received from ${info.address} MessageID:${data.MessageId} SystemID:${data.SystemId}`);
        if(data.MessageId == "3233") {
            this.log.debug("MSG 3233 received. Calling Parser-Facade.");
        }
        void this.parserFacade.handleMessage(data.SystemId, data.MessageId, msg);
    }

    private onServerListening(): void {
        const address = this.server.address();
        const port = address.port;
        const ipaddr = address.address;
        this.log.info(`UDP Listening started on ${ipaddr}:${port}`);
        void this.setState("info.connection", true, true);
    }

    private onServerClose(): void {
        this.log.info("UDP Listener Port closed.");
        void this.setState("info.connection", false, true);
    }

    private onServerError(error: Error): void {
        this.log.error(`Error in listener: ${error.message}`);
        void this.setState("info.connection", false, true);
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
