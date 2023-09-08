import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";
import { ParserCommon } from "./parser-common";
import { ParserInterface } from "./parserinterface";

interface Message_415a_CellNodeStatus_CellData {
    ID: number;
    USN: number;
    MinCellVolt: number;
    MaxCellVolt: number;
    MinCellTemp: number;
    BypassTemp: number;
    BypassAmp: number;
    Status: number;
}

interface Message_415a_CellNodeStatus {
    CmuRxOpStatusNodeID: number;
    Records: number;
    FirstNodeID: number;
    LastNodeID: number;
    nodes: Array<Message_415a_CellNodeStatus_CellData>;
}

export class Parser_415a_CellNodeStatus extends ParserCommon implements ParserInterface {

    private parser: Parser;
    private subParser: Parser;
    private initializedCellNodes: Array<number> = [];

    public constructor(adapter: utils.AdapterInstance) {
        super(adapter);
        // Category    = Telemetry
        // Object      = CellNodeItem
        // Description = Cell node - array up to 16 nodes
        // MsgLength   = variable
        // Version     = 1
        // Frequency   = 300 mS
        // Support     = Current
        // Valid to    = SW 1.0.29
        this.adapter = adapter;
        this.messageId = "415a";
        this.messageName = "Cell Node Status Limited";
        this.subParser = new Parser()
            .uint8("ID")
            .uint8("USN")
            .int16le("MinCellVolt",                 { formatter: (x) => {return x/1000;}})
            .int16le("MaxCellVolt",                 { formatter: (x) => {return x/1000;}})
            .uint8("MinCellTemp",                   { formatter: (x) => {return x-40;}}) // temperature ºC
            .uint8("BypassTemp",                    { formatter: (x) => {return x-40;}}) // temperature ºC
            .int16le("BypassAmp",                   { formatter: (x) => {return x/1000;}})
            .uint8("Status");   /* Choices NodeStatuses
                None = 0,
                HighVolt = 1,
                HighTemp = 2,
                Ok = 3,
                Timeout = 4,
                LowVolt = 5,
                Disabled = 6,
                InBypass = 7,
                InitialBypass = 8,
                FinalBypass = 9,
                MissingSetup = 10,
                NoConfig = 11,
                CellOutLimits = 12, */

        this.parser = new Parser()
            .skip(8)
            .uint8("CmuRxOpStatusNodeID")
            .uint8("Records")
            .uint8("FirstNodeID")
            .uint8("LastNodeID")
            .array("nodes", {
                type : this.subParser,
                length : "Records"
            });
    }

    public async initObjects(_systemId: number): Promise<void> {
        return;
    }

    private async initCellNode(systemId: number, id: number): Promise<void> {
        this.adapter.log.debug(`Setting Cell${id}`);
        await this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}`), {
            type: "device",
            common: {
                name: "Batrium Cell #" + id.toString()
            },
            native: {},
        });
        await Promise.all([
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.ID`), {
                type: "state",
                common: {
                    name: "ID",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.USN`), {
                type: "state",
                common: {
                    name: "USN",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellVolt`), {
                type: "state",
                common: {
                    name: "MinCellVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MaxCellVolt`), {
                type: "state",
                common: {
                    name: "MaxCellVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellTemp`), {
                type: "state",
                common: {
                    name: "MinCellTemp",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassTemp`), {
                type: "state",
                common: {
                    name: "BypassTemp",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassAmp`), {
                type: "state",
                common: {
                    name: "BypassAmp",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "A",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.Status`), {
                type: "state",
                common: {
                    name: "Status",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    states: {
                        "0": "None",
                        "1": "HighVolt",
                        "2": "HighTemp",
                        "3": "OK",
                        "4": "Timeout",
                        "5": "LowVolt",
                        "6": "Disabled",
                        "7": "InBypass",
                        "8": "InitialBypass",
                        "9": "FinalBypass",
                        "10": "MissingSetup",
                        "11": "NoConfig",
                        "12": "CellOutLimits",
                    }
                },
                native: {},
            })
        ]);
    }

    private async setCellValues(systemId: number, cellData: Message_415a_CellNodeStatus_CellData): Promise<void> {
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.ID`), cellData.ID, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.USN`), cellData.USN, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MinCellVolt`), cellData.MinCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MaxCellVolt`), cellData.MaxCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MinCellTemp`), cellData.MinCellTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.BypassTemp`), cellData.BypassTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.BypassAmp`), cellData.BypassAmp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.Status`), cellData.Status, true);
    }

    public async handleMessage(systemId: number, msg: Buffer): Promise<void> {
        if(!this.adapter.config["415a_active"] || this.ratelimitTimeout) {
            return;
        }
        this.ratelimitTimeout = this.adapter.setTimeout(() => {
            this.ratelimitTimeout = undefined;
        }, this.adapter.config["415a_ratelimit"]);
        const result: Message_415a_CellNodeStatus = this.parser.parse(msg);
        result.nodes.forEach(async nodeData => {
            if(!this.initializedCellNodes.includes(nodeData.ID)) {
                await this.initCellNode(systemId, nodeData.ID);
                this.initializedCellNodes.push(nodeData.ID);
            }
        });
        result.nodes.forEach(async nodeData => {
            this.setCellValues(systemId, nodeData);
        });
    }
}