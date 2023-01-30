
export abstract class ParserCommon {
    public messageId = "0";

    public getVariableName(systemId: number, varname: string): string {
        return `${ systemId.toString() }.${ this.messageId }.${ varname }`;
    }
}