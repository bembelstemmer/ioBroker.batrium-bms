import * as utils from "@iobroker/adapter-core";
import { Parser } from "binary-parser";
import { ParserCommon } from "./parser-common";
import { ParserInterface } from "./parserinterface";

interface Message_6831_QuickSessionHist {
    QuickSessionHistId: number;
    QuickSessionHistTime: number;
    QuickSessionHistSystemOpState: number;
    QuickSessionHistControlLogic: number;
    QuickSessionHistMinCellVolt: number;
    QuickSessionHistMaxCellVolt: number;
    QuickSessionHistAvgCellVolt: number;
    QuickSessionHistAvgCellTemp: number;
    QuickSessionHistSocHiRes: number;
    QuickSessionHistShuntVolt: number;
    QuickSessionHistShuntAmp: number;
    QuickSessionHistNumOfCellsInBypass: number;
}

export class Parser_6831_QuickSessionHist extends ParserCommon implements ParserInterface {

    private parser: Parser;

    public constructor(adapter: utils.AdapterInstance) {
        super(adapter);
        // Category    = Session history
        // Object      = Quick
        // MsgLength   = 32
        // Description = Quick session history
        // Version     = 1
        // Frequency   = adhoc
        // Support     = Current
        // Created     = SW 1.0.29
        this.adapter = adapter;
        this.messageId = "6831";
        this.messageName = "Quick session history";
        this.parser = new Parser()
            .skip(8)
            .int16le("QuickSessionHistId")
            .uint32le("QuickSessionHistTime") 		// Epoch  *** log key ***
            .uint8("QuickSessionHistSystemOpState") /* Choices
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
            .uint8( "QuickSessionHistControlLogic")
            .int16le("QuickSessionHistMinCellVolt",			{ formatter: (x) => {return x/1000;}})
            .int16le("QuickSessionHistMaxCellVolt",			{ formatter: (x) => {return x/1000;}})
            .int16le("QuickSessionHistAvgCellVolt",			{ formatter: (x) => {return x/1000;}})
            .uint8(  "QuickSessionHistAvgCellTemp",			{ formatter: (x) => {return x-40;}})	// temperature ºC
            .int16le("QuickSessionHistSocHiRes",			{ formatter: (x) => {return x/100;}})	// percent
            .int16le("QuickSessionHistShuntVolt",			{ formatter: (x) => {return x/100;}})
            .floatle("QuickSessionHistShuntAmp",			{ formatter: (x) => {return x/1000;}})  // amp
            .uint8(  "QuickSessionHistNumOfCellsInBypass");
    }

    public async initObjects(systemId: number): Promise<void> {
        await Promise.all([
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistId"), {
                type: "state",
                common: {
                    name: "QuickSessionHistId",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistTime"), {
                type: "state",
                common: {
                    name: "QuickSessionHistTime",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistSystemOpState"), {
                type: "state",
                common: {
                    name: "QuickSessionHistSystemOpState",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
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
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistControlLogic"), {
                type: "state",
                common: {
                    name: "QuickSessionHistControlLogic",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistMinCellVolt"), {
                type: "state",
                common: {
                    name: "QuickSessionHistMinCellVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistMaxCellVolt"), {
                type: "state",
                common: {
                    name: "QuickSessionHistMaxCellVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistAvgCellVolt"), {
                type: "state",
                common: {
                    name: "QuickSessionHistAvgCellVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistAvgCellTemp"), {
                type: "state",
                common: {
                    name: "QuickSessionHistAvgCellTemp",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "°C"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistSocHiRes"), {
                type: "state",
                common: {
                    name: "QuickSessionHistSocHiRes",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "%"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistShuntVolt"), {
                type: "state",
                common: {
                    name: "QuickSessionHistShuntVolt",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "V"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistShuntAmp"), {
                type: "state",
                common: {
                    name: "QuickSessionHistShuntAmp",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                    unit: "A"
                },
                native: {},
            }),
            this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistNumOfCellsInBypass"), {
                type: "state",
                common: {
                    name: "QuickSessionHistNumOfCellsInBypass",
                    type: "number",
                    role: "value",
                    read: true,
                    write: true,
                },
                native: {},
            }),
        ]);
    }

    public async handleMessage(systemId: number, msg: Buffer): Promise<void> {
        const result: Message_6831_QuickSessionHist = this.parser.parse(msg);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistId"), result.QuickSessionHistId, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistTime"), result.QuickSessionHistTime, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistSystemOpState"), result.QuickSessionHistSystemOpState, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistControlLogic"), result.QuickSessionHistControlLogic, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistMinCellVolt"), result.QuickSessionHistMinCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistMaxCellVolt"), result.QuickSessionHistMaxCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistAvgCellVolt"), result.QuickSessionHistAvgCellVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistAvgCellTemp"), result.QuickSessionHistAvgCellTemp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistSocHiRes"), result.QuickSessionHistSocHiRes, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistShuntVolt"), result.QuickSessionHistShuntVolt, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistShuntAmp"), result.QuickSessionHistShuntAmp, true);
        this.adapter.setStateChangedAsync(this.getVariableName(systemId, "QuickSessionHistNumOfCellsInBypass"), result.QuickSessionHistNumOfCellsInBypass, true);
    }
}