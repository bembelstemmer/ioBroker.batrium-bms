
import * as utils from "@iobroker/adapter-core";
import { ParserInterface } from "./parserinterface";
import { ParserBaseData, MessageBaseData } from "./parser-base-data";
import { Parser_5732_SystemDiscovery } from "./parser-5732-SystemDiscovery";

export class ParserFacade {
    private parserMap: Map<string, ParserInterface>;
    private adapter: utils.AdapterInstance
    private parserBaseData: ParserBaseData;

    public constructor(adapter: utils.AdapterInstance) {
        this.adapter = adapter;
        this.parserBaseData = new ParserBaseData();
        this.parserMap = new Map<string, ParserInterface>();
        this.parserMap.set("5732", new Parser_5732_SystemDiscovery(this.adapter));

    }

    public getMessageBaseData(buf: Buffer): MessageBaseData {
        return this.parserBaseData.parse(buf);
    }

    public handleMessage(systemId: number, messageID: string, msg: Buffer): boolean {
        if(!this.parserMap.has(messageID)) {
            this.adapter.log.warn(`Unknown MessageID ${ messageID } received`);
            return false;
        }
        return !!this.parserMap.get(messageID)?.handleMessage(systemId, msg);
    }
}