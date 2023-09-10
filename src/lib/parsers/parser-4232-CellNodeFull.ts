import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";
import { ParserCommon } from "./parser-common";
import { ParserInterface } from "./parserinterface";

interface Message_4232_CellNodeFull {
    ID: number;
    USN: number;
    MinCellVolt: number;
    MaxCellVolt: number;
    MinCellTemp: number;
    BypassTemp: number;
    BypassAmp: number;
    DataErrorCounter: number;
    ResetCounter: number;
    Status: number;
    IsOverdue: boolean;
    LoCellVoltAlert: number;
    HiCellVoltAlert: number;
    BypassVoltLevel: number;
    BypassAmpLimit: number;
    BypassTempLimit: number;
    HiCellTempAlert: number;
    RawVoltCalOffset: number;
    FwVers: number;
    HwVers: number;
    BootVers: number;
    SerialNo: number;
    BypassInitialDate: number;
    BypassSessionAh: number;
    RepeatCellV: number;
}

export class Parser_4232_CellNodeFull extends ParserCommon implements ParserInterface {

    private parser: Parser;
    private initializedCellNodes: Array<number> = [];

    public constructor(adapter: utils.AdapterInstance) {
        super(adapter);
        // Category    = Telemetry
        // Object      = CellNodeItem
        // Description = Cell node - full details
        // MsgLength   = 52
        // Version     = 2
        // Frequency   = 300 mS
        // Support     = Current
        // Valid to    = SW 1.0.29
        this.adapter = adapter;
        this.messageId = "4232";
        this.messageName = "Cell Node Full";
        this.parser = new Parser()
            .skip(8)
            .uint8("ID")
            .uint8("USN")
            .int16le("MinCellVolt",			{ formatter: (x) => {return x/1000;}})
            .int16le("MaxCellVolt",			{ formatter: (x) => {return x/1000;}})
            .uint8("MinCellTemp",			{ formatter: (x) => {return x-40;}}) // temperature ºC
            .uint8("BypassTemp",			{ formatter: (x) => {return x-40;}}) // temperature ºC
            .int16le("BypassAmp", 			{ formatter: (x) => {return x/1000;}})
            .uint8("DataErrorCounter")
            .uint8("ResetCounter")
            .uint8("Status") /* Choices NodeStatuses
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
            .uint8("IsOverdue")				// boolean 0 = Off , 1 = On
            .int16le("LoCellVoltAlert",		{ formatter: (x) => {return x/1000;}})
            .int16le("HiCellVoltAlert",		{ formatter: (x) => {return x/1000;}})
            .int16le("BypassVoltLevel",		{ formatter: (x) => {return x/1000;}})
            .int16le("BypassAmpLimit",		{ formatter: (x) => {return x/1000;}})
            .uint8("BypassTempLimit",		{ formatter: (x) => {return x-40;}}) // temperature ºC
            .uint8("HiCellTempAlert",		{ formatter: (x) => {return x-40;}}) // temperature ºC
            .uint8("RawVoltCalOffset")
            .int16le("FwVers")
            .int16le("HwVers")
            .int16le("BootVers")
            .uint32le("SerialNo")
            .uint32le("BypassInitialDate") 	// Epoch
            .floatle("BypassSessionAh",		{ formatter: (x) => {return x/1000;}}) // Ah
            .uint8("RepeatCellV");
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
                    role: "info.address",
                    read: true,
                    write: false,
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
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellVolt`), {
                type: "state",
                common: {
                    name: "MinCellVolt",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MaxCellVolt`), {
                type: "state",
                common: {
                    name: "MaxCellVolt",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellTemp`), {
                type: "state",
                common: {
                    name: "MinCellTemp",
                    type: "number",
                    role: "value.temperature",
                    read: true,
                    write: false,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassTemp`), {
                type: "state",
                common: {
                    name: "BypassTemp",
                    type: "number",
                    role: "value.temperature",
                    read: true,
                    write: false,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassAmp`), {
                type: "state",
                common: {
                    name: "BypassAmp",
                    type: "number",
                    role: "value.current",
                    read: true,
                    write: false,
                    unit: "A",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.DataErrorCounter`), {
                type: "state",
                common: {
                    name: "DataErrorCounter",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.ResetCounter`), {
                type: "state",
                common: {
                    name: "ResetCounter",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.Status`), {
                type: "state",
                common: {
                    name: "Status",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
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
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.IsOverdue`), {
                type: "state",
                common: {
                    name: "IsOverdue",
                    type: "boolean",
                    role: "info.status",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.LoCellVoltAlert`), {
                type: "state",
                common: {
                    name: "LoCellVoltAlert",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HiCellVoltAlert`), {
                type: "state",
                common: {
                    name: "HiCellVoltAlert",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassVoltLevel`), {
                type: "state",
                common: {
                    name: "BypassVoltLevel",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassAmpLimit`), {
                type: "state",
                common: {
                    name: "BypassAmpLimit",
                    type: "number",
                    role: "value.current",
                    read: true,
                    write: false,
                    unit: "A",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassTempLimit`), {
                type: "state",
                common: {
                    name: "BypassTempLimit",
                    type: "number",
                    role: "value.temperature",
                    read: true,
                    write: false,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HiCellTempAlert`), {
                type: "state",
                common: {
                    name: "HiCellTempAlert",
                    type: "number",
                    role: "value.temperature",
                    read: true,
                    write: false,
                    unit: "°C",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.RawVoltCalOffset`), {
                type: "state",
                common: {
                    name: "RawVoltCalOffset",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.FwVers`), {
                type: "state",
                common: {
                    name: "FwVers",
                    type: "number",
                    role: "info.firmware",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HwVers`), {
                type: "state",
                common: {
                    name: "HwVers",
                    type: "number",
                    role: "info.hardware",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BootVers`), {
                type: "state",
                common: {
                    name: "BootVers",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.SerialNo`), {
                type: "state",
                common: {
                    name: "SerialNo",
                    type: "number",
                    role: "info.serial",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassInitialDate`), {
                type: "state",
                common: {
                    name: "BypassInitialDate",
                    type: "number",
                    role: "date",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassSessionAh`), {
                type: "state",
                common: {
                    name: "BypassSessionAh",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                    unit: "Ah",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.RepeatCellV`), {
                type: "state",
                common: {
                    name: "RepeatCellV",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            })
        ]);
    }

    public async handleMessage(systemId: number, msg: Buffer): Promise<void> {
        if(!this.adapter.config["4232_active"] || this.ratelimitTimeout) {
            return;
        }
        this.ratelimitTimeout = this.adapter.setTimeout(() => {
            this.ratelimitTimeout = undefined;
        }, this.adapter.config["4232_ratelimit"]);
        const result: Message_4232_CellNodeFull = this.parser.parse(msg);
        if(!this.initializedCellNodes.includes(result.ID)) {
            await this.initCellNode(systemId, result.ID);
            this.initializedCellNodes.push(result.ID);
        }
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.ID`), result.ID, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.USN`), result.USN, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.MinCellVolt`), result.MinCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.MaxCellVolt`), result.MaxCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.MinCellTemp`), result.MinCellTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassTemp`), result.BypassTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassAmp`), result.BypassAmp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.DataErrorCounter`), result.DataErrorCounter, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.ResetCounter`), result.ResetCounter, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.Status`), result.Status, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.IsOverdue`), Boolean(result.IsOverdue), true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.LoCellVoltAlert`), result.LoCellVoltAlert, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.HiCellVoltAlert`), result.HiCellVoltAlert, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassVoltLevel`), result.BypassVoltLevel, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassAmpLimit`), result.BypassAmpLimit, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassTempLimit`), result.BypassTempLimit, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.HiCellTempAlert`), result.HiCellTempAlert, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.RawVoltCalOffset`), result.RawVoltCalOffset, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.FwVers`), result.FwVers, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.HwVers`), result.HwVers, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BootVers`), result.BootVers, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.SerialNo`), result.SerialNo, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassInitialDate`), result.BypassInitialDate, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.BypassSessionAh`), result.BypassSessionAh, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${result.ID}.RepeatCellV`), result.RepeatCellV, true);
    }
}