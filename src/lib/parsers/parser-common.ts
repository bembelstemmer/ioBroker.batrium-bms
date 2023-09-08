import * as utils from "@iobroker/adapter-core";

export abstract class ParserCommon {
    public adapter: utils.AdapterInstance;
    public messageId= "0";
    public messageName = "unknown";
    public ratelimitTimeout: ioBroker.Timeout | undefined = undefined;

    public constructor(adapter: utils.AdapterInstance) {
        this.adapter = adapter;
    }

    public getVariableName(systemId: number, varname: string): string {
        return `${ this.adapter.name }.${ this.adapter.instance!.toString() }.${ systemId.toString() }.${ this.messageId }.${ varname }`;
    }

    public getMessageName(): string {
        return this.messageName;
    }
}