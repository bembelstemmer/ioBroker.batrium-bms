
import * as utils from "@iobroker/adapter-core";
import { ParserInterface } from "./parserinterface";
import { ParserBaseData, MessageBaseData } from "./parser-base-data";
import { Parser_5732_SystemDiscovery } from "./parser-5732-SystemDiscovery";
import { Parser_3233_LiveDisplay } from "./parser-3233-LiveDisplay";
import { Parser_6831_QuickSessionHist } from "./parser-6831-QuickSessionHist";
import { Parser_415a_CellNodeStatus } from "./parser-415a-CellNodeStatus";
import { Parser_4232_CellNodeFull } from "./parser-4232-CellNodeFull";

export class ParserFacade {
    private parserMap: Map<string, ParserInterface>;
    private adapter: utils.AdapterInstance
    private parserBaseData: ParserBaseData;
    private knownSystems: Array<string> = [];
    private knownSystemMessages: Array<string> = [];

    public constructor(adapter: utils.AdapterInstance) {
        this.adapter = adapter;
        this.parserBaseData = new ParserBaseData();
        this.parserMap = new Map<string, ParserInterface>();
        this.parserMap.set("3233", new Parser_3233_LiveDisplay(this.adapter));
        this.parserMap.set("415a", new Parser_415a_CellNodeStatus(this.adapter));
        this.parserMap.set("4232", new Parser_4232_CellNodeFull(this.adapter));
        this.parserMap.set("5732", new Parser_5732_SystemDiscovery(this.adapter));
        this.parserMap.set("6831", new Parser_6831_QuickSessionHist(this.adapter));
    }

    public getMessageBaseData(buf: Buffer): MessageBaseData {
        return this.parserBaseData.parse(buf);
    }

    private async createSystemNode(systemId: number): Promise<void> {
        await this.adapter?.setObjectNotExistsAsync(`${ this.adapter?.name }.${ this.adapter.instance!.toString() }.${ systemId.toString() }`, {
            type: "device",
            common: {
                name: "Batrium Device #" + systemId.toString()
            },
            native: {},
        });
    }

    private async createSystemMessageNode(systemId: number, messageId: string): Promise<void> {2
        await this.adapter?.setObjectNotExistsAsync(`${ this.adapter?.name }.${ this.adapter.instance!.toString() }.${ systemId.toString() }.${ messageId }`, {
            type: "channel",
            common: {
                name: this.parserMap.get(messageId)?.getMessageName() ?? "Unknown Type"
            },
            native: {},
        });
    }

    public async handleMessage(systemId: number, messageID: string, msg: Buffer): Promise<boolean> {
        if(!this.parserMap.has(messageID)) {
            this.adapter.log.debug(`Unknown MessageID ${ messageID } received`);
            return false;
        }
        if(!this.knownSystems.includes(systemId.toString())) {
            await this.createSystemNode(systemId);
            this.knownSystems.push(systemId.toString());
        }
        const cachekey: string = systemId.toString() + "." + messageID;
        if(!this.knownSystemMessages.includes(cachekey)) {
            await this.createSystemMessageNode(systemId, messageID);
            await this.parserMap.get(messageID)?.initObjects(systemId);
            this.knownSystemMessages.push(cachekey);
        }
        return !!this.parserMap.get(messageID)?.handleMessage(systemId, msg);
    }
}