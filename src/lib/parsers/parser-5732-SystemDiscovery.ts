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

    private parser: Parser;

    public constructor(adapter: utils.AdapterInstance) {
        super(adapter);
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
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemCode"), {
                type: "state",
                common: {
                    name: "SystemCode",
                    type: "string",
                    role: "info.name",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), {
                type: "state",
                common: {
                    name: "SystemFirmwareVersion",
                    type: "number",
                    role: "info.firmware",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemHardwareVersion"), {
                type: "state",
                common: {
                    name: "SystemHardwareVersion",
                    type: "number",
                    role: "info.hardware",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
                type: "state",
                common: {
                    name: "SystemTime",
                    type: "number",
                    role: "date",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
                type: "state",
                common: {
                    name: "SystemOpStatus",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Simulator",
                        "1": "Idle",
                        "2": "Discharging",
                        "3": "SoC Empty",
                        "4": "Charging",
                        "5": "Full",
                        "6": "Timeout",
                        "7": "Critical Pending",
                        "8": "Critical Offline",
                        "9": "Mqtt Offline",
                        "10": "Auth Setup",
                        "11": "Shunt Timeout",
                    }
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemAuthMode"), {
                type: "state",
                common: {
                    name: "SystemAuthMode",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Default",
                        "1": "Technician",
                        "2": "Factory",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalBatOkState"), {
                type: "state",
                common: {
                    name: "CriticalBatOkState",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Off",
                        "1": "On",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargePowerRateState"), {
                type: "state",
                common: {
                    name: "ChargePowerRateState",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Off",
                        "2": "Limited Power",
                        "4": "Normal Power",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DischargePowerRateState"), {
                type: "state",
                common: {
                    name: "DischargePowerRateState",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Off",
                        "2": "Limited Power",
                        "4": "Normal Power",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "HeatOnState"), {
                type: "state",
                common: {
                    name: "HeatOnState",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Off",
                        "1": "On",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CoolOnState"), {
                type: "state",
                common: {
                    name: "CoolOnState",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Off",
                        "1": "On",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellVolt"), {
                type: "state",
                common: {
                    name: "MinCellVolt",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellVolt"), {
                type: "state",
                common: {
                    name: "MaxCellVolt",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellVolt"), {
                type: "state",
                common: {
                    name: "AvgCellVolt",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
                type: "state",
                common: {
                    name: "MinCellTemp",
                    type: "number",
                    role: "value.temperature",
                    read: true,
                    write: false,
                    unit: "°C"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsActive"), {
                type: "state",
                common: {
                    name: "NumOfCellsActive",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), {
                type: "state",
                common: {
                    name: "CmuRxOpStatusUSN",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuPollerMode"), {
                type: "state",
                common: {
                    name: "CmuPollerMode",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Idle",
                        "1": "Normal",
                        "2": "Collection Start",
                        "3": "Collection Running",
                        "4": "Sync Start",
                        "5": "Sync Running",
                        "6": "NetworkTest Start",
                        "7": "NetworkTest Running",
                        "8": "BypassTest Start",
                        "9": "BypassTest Running",
                        "10": "RebootAll Start",
                        "11": "Rebooting AllDevices",
                        "12": "Simulator Start",
                        "13": "Simulator Running",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
                type: "state",
                common: {
                    name: "ShuntSOC",
                    type: "number",
                    role: "value.battery",
                    read: true,
                    write: false,
                    unit: "%",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntVoltage"), {
                type: "state",
                common: {
                    name: "ShuntVoltage",
                    type: "number",
                    role: "value.voltage",
                    read: true,
                    write: false,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
                type: "state",
                common: {
                    name: "ShuntCurrent",
                    type: "number",
                    role: "value.current",
                    read: true,
                    write: false,
                    unit: "A",
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntStatus"), {
                type: "state",
                common: {
                    name: "ShuntStatus",
                    type: "number",
                    role: "info.status",
                    read: true,
                    write: false,
                    states: {
                        "0": "Timeout",
                        "1": "Discharging",
                        "2": "Idle",
                        "4": "Charging",
                    },
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), {
                type: "state",
                common: {
                    name: "ShuntRxAmpTicks",
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            }),
        ]);
    }

    public async handleMessage(systemId: number, msg: Buffer): Promise<void> {
        if(!this.adapter.config["5732_active"] || this.ratelimitTimeout) {
            return;
        }
        this.ratelimitTimeout = this.adapter.setTimeout(() => {
            this.ratelimitTimeout = undefined;
        }, this.adapter.config["5732_ratelimit"]);
        const result: Message_5732_SystemDiscovery = this.parser.parse(msg);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemCode"), result.SystemCode, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), result.SystemFirmwareVersion, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemHardwareVersion"), result.SystemHardwareVersion, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ChargePowerRateState"), result.ChargePowerRateState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DischargePowerRateState"), result.DischargePowerRateState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsActive"), result.NumOfCellsActive, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), result.CmuRxOpStatusUSN, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CmuPollerMode"), result.CmuPollerMode, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntStatus"), result.ShuntStatus, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), result.ShuntRxAmpTicks, true);
    }
}