import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";

export abstract class ParserCommon {
    public messageId: string | undefined;
    public parser: Parser | undefined;
    public adapter: utils.AdapterInstance | undefined;
    public messageName = "unknown";

    public getVariableName(systemId: number, varname: string): string {
        return `${ this.adapter?.name }.${ this.adapter?.instance.toString() }.${ systemId.toString() }.${ this.messageId }.${ varname }`;
    }

    public getMessageName(): string {
        return this.messageName;
    }
}