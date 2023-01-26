import { Parser } from "binary-parser";

export interface MessageBaseData {
    first: string;
    MessageId: string;
    nd: string;
    SystemId: number;
    hubId: number;
}

export class ParserBaseData {

    private parser: Parser;

    public constructor() {
        this.parser = new Parser()
            .string("first", { encoding: "utf8", length: 1 })
            .int16le("MessageId", { formatter: (x) => {return x.toString(16);}})
            .string("nd", { encoding: "utf8", length: 1 })
            .int16le("SystemId")
            .int16le("hubId");
    }

    public parse(buf: Buffer): MessageBaseData {
        return this.parser.parse(buf);
    }
}