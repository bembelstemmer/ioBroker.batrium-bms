import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";
import { ParserCommon } from "./parser-common";
import { ParserInterface } from "./parserinterface";

interface Message_3233_LiveDisplay {
    SystemOpStatus: number;
    SystemAuthMode: number;
    CriticalBatOkState: boolean;
    CriticalIsTransition: boolean;
    CriticalIsPrecharge: boolean;
    HeatOnState: boolean;
    CoolOnState: boolean;
    ChargeOnState: boolean;
    ChargeIsLimPower: boolean;
    DischgOnState: boolean;
    DischgIsLimPower: boolean;
    ChargeInBypass: boolean;
    ChargeHasBypassTempRelief: boolean;
    MinCellVolt: number;
    MaxCellVolt: number;
    AvgCellVolt: number;
    MinCellTemp: number;
    MaxCellTemp: number;
    AvgCellTemp: number;
    NumOfCellsInBypass: number;
    ShuntVoltage: number;
    ShuntCurrent: number;
    ShuntPowerVA: number;
    ShuntSOC: number;
    NomCapacityToEmpty: number;
    ShuntCumulkWhCharge: number;
    ShuntCumulkWhDischg: number;
    CriticalEvents: number;
    SystemTime: number;
    GlobalSetupVers: number;
    LifetimeSetupVers: number;
    DiffBypassTicks: number;
    DiffTempTicks: number;
    DiffVoltTicks: number;
    DiffLogicTicks: number;
}

export class Parser_3233_LiveDisplay extends ParserCommon implements ParserInterface {

    //public parser: Parser;
    //public adapter: utils.AdapterInstance;

    public constructor(adapter: utils.AdapterInstance) {
        super();
        // Category    = Discovery
        // Description = System Discovery message
        // MsgLength   = 57
        // Version     = 3
        // Frequency   = 2 seconds
        // Valid from  = SW 2.15
        this.adapter = adapter;
        this.messageId = "3233";
        this.messageName = "Live Display";
        this.parser = new Parser()
            .skip(8)
            .uint8("SystemOpStatus") /* Choices
                    Simulator = 0,        // LED = rainbow pulse
                    Idle = 1,             // LED = green slow pulse
                    Discharging = 2,      // LED = green solid
                    SoC Empty = 3,        // LED = green double blink
                    Charging = 4,         // LED = blue slow pulse
                    Full = 5,             // LED = blue double blink
                    Timeout = 6,          // LED = red solid
                    Critical Pending = 7, // LED = red fast pulse
                    Critical Offline = 8, // LED = red slow pulse
                    Mqtt Offline = 9,     // LED = white blink
                    Auth Setup = 10,      // LED = white solid
                    Shunt Timeout = 11,   // LED = red solid  */
            .uint8("SystemAuthMode") /* Choices
                    Default     = 0,
                    Technician  = 1,
                    Factory     = 2, */
            .bit1("CriticalBatOkState")         // boolean index 10 - bit0
            .bit1("CriticalIsTransition")       // boolean index 10 - bit1
            .bit1("CriticalIsPrecharge")        // boolean index 10 - bit2
            .bit1("HeatOnState")                // boolean index 10 - bit3
            .bit1("CoolOnState")                // boolean index 10 - bit4
            .bit3("reserved1")
            .bit1("ChargeOnState")              // boolean index 11 - bit0
            .bit1("ChargeIsLimPower")           // boolean index 11 - bit1
            .bit1("DischgOnState")              // boolean index 11 - bit2
            .bit1("DischgIsLimPower")           // boolean index 11 - bit3
            .bit1("ChargeInBypass")             // boolean index 11 - bit4
            .bit1("ChargeHasBypassTempRelief")  // boolean index 11 - bit5
            .bit2("reserved2")
            .int16le("MinCellVolt",     { formatter: (x) => {return x/1000;}})   // index 12 - voltage
            .int16le("MaxCellVolt",     { formatter: (x) => {return x/1000;}})   // index 14 - voltage
            .int16le("AvgCellVolt",     { formatter: (x) => {return x/1000;}})   // index 16 - voltage
            .uint8("MinCellTemp",       { formatter: (x) => {return x-40;}})     // index 18 - temperature ºC
            .uint8("MaxCellTemp",       { formatter: (x) => {return x-40;}})     // index 19 - temperature ºC
            .uint8("AvgCellTemp",       { formatter: (x) => {return x-40;}})     // index 20 - temperature ºC
            .uint8("NumOfCellsInBypass")
            .int16le("ShuntVoltage",    { formatter: (x) => {return x/100;}})
            .floatle("ShuntCurrent",    { formatter: (x) => {return x/1000;}})
            .floatle("ShuntPowerVA",    { formatter: (x) => {return x/1000;}}) // kW
            .int16le("ShuntSOC",        { formatter: (x) => {return x/100;}})  // percent hires 2 dec.pt
            .floatle("NomCapacityToEmpty",  { formatter: (x) => {return x/1000;}}) // Ah
            .floatle("ShuntCumulkWhCharge", { formatter: (x) => {return x/1000;}}) // kWh
            .floatle("ShuntCumulkWhDischg", { formatter: (x) => {return x/1000;}}) // kWh
            .uint8("CriticalEvents")
            .int32le("SystemTime")      // index 47 - Epoch
            .uint8("GlobalSetupVers")   // index 51
            .uint8("LifetimeSetupVers") // index 52
            .uint8("DiffBypassTicks")   // index 53
            .uint8("DiffTempTicks")     // index 54
            .uint8("DiffVoltTicks")     // index 55
            .uint8("DiffLogicTicks");    // index 56
    }

    public async initObjects(systemId: number): Promise<void> {
        await Promise.all([
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
                type: "state",
                common: {
                    name: "SystemOpStatus",
                    type: "string",
                    role: "common",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemAuthMode"), {
                type: "state",
                common: {
                    name: "SystemAuthMode",
                    type: "number",
                    role: "indicator",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalBatOkState"), {
                type: "state",
                common: {
                    name: "CriticalBatOkState",
                    type: "number",
                    role: "indicator",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsTransition"), {
                type: "state",
                common: {
                    name: "CriticalIsTransition",
                    type: "number",
                    role: "common",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), {
                type: "state",
                common: {
                    name: "CriticalIsPrecharge",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "HeatOnState"), {
                type: "state",
                common: {
                    name: "HeatOnState",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CoolOnState"), {
                type: "state",
                common: {
                    name: "CoolOnState",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeOnState"), {
                type: "state",
                common: {
                    name: "ChargeOnState",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeIsLimPower"), {
                type: "state",
                common: {
                    name: "ChargeIsLimPower",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgOnState"), {
                type: "state",
                common: {
                    name: "DischgOnState",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgIsLimPower"), {
                type: "state",
                common: {
                    name: "DischgIsLimPower",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeInBypass"), {
                type: "state",
                common: {
                    name: "ChargeInBypass",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), {
                type: "state",
                common: {
                    name: "ChargeHasBypassTempRelief",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellVolt"), {
                type: "state",
                common: {
                    name: "MinCellVolt",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellVolt"), {
                type: "state",
                common: {
                    name: "MaxCellVolt",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "°C"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellVolt"), {
                type: "state",
                common: {
                    name: "AvgCellVolt",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
                type: "state",
                common: {
                    name: "MinCellTemp",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellTemp"), {
                type: "state",
                common: {
                    name: "MaxCellTemp",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellTemp"), {
                type: "state",
                common: {
                    name: "AvgCellTemp",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "%",
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), {
                type: "state",
                common: {
                    name: "NumOfCellsInBypass",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntVoltage"), {
                type: "state",
                common: {
                    name: "ShuntVoltage",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                    unit: "A",
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
                type: "state",
                common: {
                    name: "ShuntCurrent",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntPowerVA"), {
                type: "state",
                common: {
                    name: "ShuntPowerVA",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
                type: "state",
                common: {
                    name: "ShuntSOC",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), {
                type: "state",
                common: {
                    name: "NomCapacityToEmpty",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), {
                type: "state",
                common: {
                    name: "ShuntCumulkWhCharge",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), {
                type: "state",
                common: {
                    name: "ShuntCumulkWhDischg",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalEvents"), {
                type: "state",
                common: {
                    name: "CriticalEvents",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
                type: "state",
                common: {
                    name: "SystemTime",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "GlobalSetupVers"), {
                type: "state",
                common: {
                    name: "GlobalSetupVers",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "LifetimeSetupVers"), {
                type: "state",
                common: {
                    name: "LifetimeSetupVers",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffBypassTicks"), {
                type: "state",
                common: {
                    name: "DiffBypassTicks",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffTempTicks"), {
                type: "state",
                common: {
                    name: "DiffTempTicks",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffVoltTicks"), {
                type: "state",
                common: {
                    name: "DiffVoltTicks",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffLogicTicks"), {
                type: "state",
                common: {
                    name: "DiffLogicTicks",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
        ]);
    }

    public async handleMessage(systemId: number, msg: Buffer): Promise<void> {
        const result: Message_3233_LiveDisplay = this.parser?.parse(msg);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsTransition"), result.CriticalIsTransition, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), result.CriticalIsPrecharge, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ChargeOnState"), result.ChargeOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ChargeIsLimPower"), result.ChargeIsLimPower, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DischgOnState"), result.DischgOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DischgIsLimPower"), result.DischgIsLimPower, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ChargeInBypass"), result.ChargeInBypass, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), result.ChargeHasBypassTempRelief, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MaxCellTemp"), result.MaxCellTemp, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "AvgCellTemp"), result.AvgCellTemp, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), result.NumOfCellsInBypass, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntPowerVA"), result.ShuntPowerVA, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), result.NomCapacityToEmpty, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), result.ShuntCumulkWhCharge, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), result.ShuntCumulkWhDischg, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CriticalEvents"), result.CriticalEvents, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "GlobalSetupVers"), result.GlobalSetupVers, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "LifetimeSetupVers"), result.LifetimeSetupVers, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DiffBypassTicks"), result.DiffBypassTicks, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DiffTempTicks"), result.DiffTempTicks, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DiffVoltTicks"), result.DiffVoltTicks, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DiffLogicTicks"), result.DiffLogicTicks, true);
    }
}