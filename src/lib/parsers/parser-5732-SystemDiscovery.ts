import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";
import { ParserCommon } from "./parser-common";
import { ParserInterface } from "./parserinterface";

interface Message_5732_SystemDiscovery {
    SystemCode: string;
    SystemFirmwareVersion: number;
    SystemHardwareVersion: number;
    SystemTime: number;
    SystemOpStatus: number;
    SystemAuthMode: number;
    CriticalBatOkState: number;
    ChargePowerRateState: number;
    DischargePowerRateState: number;
    HeatOnState: number;
    CoolOnState: number;
    MinCellVolt: number;
    MaxCellVolt: number;
    AvgCellVolt: number;
    MinCellTemp: number;
    NumOfCellsActive: number;
    CmuRxOpStatusUSN: number;
    CmuPollerMode: number;
    ShuntSOC: number;
    ShuntVoltage: number;
    ShuntCurrent: number;
    ShuntStatus: number;
    ShuntRxAmpTicks: number;
}

export class Parser_5732_SystemDiscovery extends ParserCommon implements ParserInterface {

    //public parser: Parser;
    //public adapter: utils.AdapterInstance;

    public constructor(adapter: utils.AdapterInstance) {
        super();
        // Category    = Discovery
        // MsgLength   = 50
        // Description = System Discovery message
        // Version     = 2
        // Frequency   = 2 seconds
        // Support     = Current
        // Valid to    = SW 1.0.29
        this.adapter = adapter;
        this.messageId = "5732";
        this.messageName = "System Discovery message";
        this.parser = new Parser()
            .skip(8)
            .string("SystemCode", 	{ encoding: "utf8", length: 8, stripNull: true })
            .int16le("SystemFirmwareVersion")
            .int16le("SystemHardwareVersion")
            .int32le("SystemTime") // Epoch
            .uint8("SystemOpStatus") /* Choices
                    Simulator = 0,   	  // LED = rainbow pulse
                    Idle = 1,        	  // LED = green slow pulse
                    Discharging = 2, 	  // LED = green solid
                    SoC Empty = 3,   	  // LED = green double blink
                    Charging = 4,    	  // LED = blue slow pulse
                    Full = 5,        	  // LED = blue double blink
                    Timeout = 6,     	  // LED = red solid
                    Critical Pending = 7, // LED = red fast pulse
                    Critical Offline = 8, // LED = red slow pulse
                    Mqtt Offline = 9,     // LED = white blink
                    Auth Setup = 10,      // LED = white solid
                    Shunt Timeout = 11,   // LED = red solid  	*/
            .uint8("SystemAuthMode") /* Choices
                    Default 	= 0,
                    Technician 	= 1,
                    Factory 	= 2, */
            .uint8("CriticalBatOkState")    // 0 = Off , 1 = On
            .uint8("ChargePowerRateState")  /* Choices
                    Off 			= 0,
                    Limited Power 	= 2,
                    Normal Power  	= 4, */
            .uint8("DischargePowerRateState") /* Choices
                    Off 			= 0,
                    Limited Power 	= 2,
                    Normal Power  	= 4, */
            .uint8("HeatOnState") 			// 0 = Off , 1 = On
            .uint8("CoolOnState") 			// 0 = Off , 1 = On
            .int16le("MinCellVolt", 	{ formatter: (x) => {return x/1000;}})
            .int16le("MaxCellVolt", 	{ formatter: (x) => {return x/1000;}})
            .int16le("AvgCellVolt", 	{ formatter: (x) => {return x/1000;}})
            .uint8("MinCellTemp", 		{ formatter: (x) => {return x-40;}})     // temperature ºC
            .uint8("NumOfCellsActive")
            .uint8("CmuRxOpStatusUSN")
            .uint8("CmuPollerMode")  /* Choices
                    Idle = 0,
                    Normal = 1,
                    Collection Start = 2,
                    Collection Running = 3,
                    Sync Start = 4,
                    Sync Running = 5,
                    NetworkTest Start = 6,
                    NetworkTest Running = 9,
                    BypassTest Start = 7,
                    BypassTest Running = 8,
                    RebootAll Start = 10,
                    Rebooting AllDevices = 11,
                    Simulator Start = 12,
                    Simulator Running = 13, */
            .uint8("ShuntSOC",			{ formatter: (x) => {return x/2-5;}})    // percent
            .int16le("ShuntVoltage",	{ formatter: (x) => {return x/100;}})
            .floatle("ShuntCurrent",	{ formatter: (x) => {return x/1000;}})
            .uint8("ShuntStatus") /* Choices
                    Timeout = 0,
                    Discharging = 1,
                    Idle = 2,
                    Charging = 4 */
            .uint8("ShuntRxAmpTicks");
    }

    public async initObjects(systemId: number): Promise<void> {
        await Promise.all([
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemCode"), {
                type: "state",
                common: {
                    name: "SystemCode",
                    type: "string",
                    role: "common",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), {
                type: "state",
                common: {
                    name: "SystemFirmwareVersion",
                    type: "number",
                    role: "indicator",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemHardwareVersion"), {
                type: "state",
                common: {
                    name: "SystemHardwareVersion",
                    type: "number",
                    role: "indicator",
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
                    role: "common",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
                type: "state",
                common: {
                    name: "SystemOpStatus",
                    type: "number",
                    role: "level",
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
                    role: "level",
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
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargePowerRateState"), {
                type: "state",
                common: {
                    name: "ChargePowerRateState",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "DischargePowerRateState"), {
                type: "state",
                common: {
                    name: "DischargePowerRateState",
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
                    unit: "V"
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
                    unit: "V"
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
                    unit: "°C"
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsActive"), {
                type: "state",
                common: {
                    name: "NumOfCellsActive",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), {
                type: "state",
                common: {
                    name: "CmuRxOpStatusUSN",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuPollerMode"), {
                type: "state",
                common: {
                    name: "CmuPollerMode",
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
                    unit: "%",
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
                    unit: "V"
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
                    unit: "A",
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntStatus"), {
                type: "state",
                common: {
                    name: "ShuntVoltage",
                    type: "number",
                    role: "level",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter?.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), {
                type: "state",
                common: {
                    name: "ShuntRxAmpTicks",
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
        const result: Message_5732_SystemDiscovery = this.parser?.parse(msg);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemCode"), result.SystemCode, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), result.SystemFirmwareVersion, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemHardwareVersion"), result.SystemHardwareVersion, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ChargePowerRateState"), result.ChargePowerRateState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "DischargePowerRateState"), result.DischargePowerRateState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsActive"), result.NumOfCellsActive, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), result.CmuRxOpStatusUSN, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "CmuPollerMode"), result.CmuPollerMode, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntStatus"), result.ShuntStatus, true);
        this.adapter?.setStateChangedAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), result.ShuntRxAmpTicks, true);
    }
}