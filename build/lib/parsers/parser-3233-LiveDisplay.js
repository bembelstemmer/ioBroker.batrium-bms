"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var parser_3233_LiveDisplay_exports = {};
__export(parser_3233_LiveDisplay_exports, {
  Parser_3233_LiveDisplay: () => Parser_3233_LiveDisplay
});
module.exports = __toCommonJS(parser_3233_LiveDisplay_exports);
var import_binary_parser = require("binary-parser");
var import_parser_common = require("./parser-common");
class Parser_3233_LiveDisplay extends import_parser_common.ParserCommon {
  constructor(adapter) {
    super(adapter);
    this.adapter = adapter;
    this.messageId = "3233";
    this.messageName = "Live Display";
    this.parser = new import_binary_parser.Parser().skip(8).uint8("SystemOpStatus").uint8("SystemAuthMode").bit1("CriticalBatOkState").bit1("CriticalIsTransition").bit1("CriticalIsPrecharge").bit1("HeatOnState").bit1("CoolOnState").bit3("reserved1").bit1("ChargeOnState").bit1("ChargeIsLimPower").bit1("DischgOnState").bit1("DischgIsLimPower").bit1("ChargeInBypass").bit1("ChargeHasBypassTempRelief").bit2("reserved2").int16le("MinCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("MaxCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("AvgCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("MinCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("MaxCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("AvgCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("NumOfCellsInBypass").int16le("ShuntVoltage", { formatter: (x) => {
      return x / 100;
    } }).floatle("ShuntCurrent", { formatter: (x) => {
      return x / 1e3;
    } }).floatle("ShuntPowerVA", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("ShuntSOC", { formatter: (x) => {
      return x / 100;
    } }).floatle("NomCapacityToEmpty", { formatter: (x) => {
      return x / 1e3;
    } }).floatle("ShuntCumulkWhCharge", { formatter: (x) => {
      return x / 1e3;
    } }).floatle("ShuntCumulkWhDischg", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("CriticalEvents").int32le("SystemTime").uint8("GlobalSetupVers").uint8("LifetimeSetupVers").uint8("DiffBypassTicks").uint8("DiffTempTicks").uint8("DiffVoltTicks").uint8("DiffLogicTicks");
  }
  async initObjects(systemId) {
    await Promise.all([
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
        type: "state",
        common: {
          name: "SystemOpStatus",
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
            "11": "Shunt Timeout"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemAuthMode"), {
        type: "state",
        common: {
          name: "SystemAuthMode",
          type: "number",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "Default",
            "1": "Technician",
            "2": "Factory"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalBatOkState"), {
        type: "state",
        common: {
          name: "CriticalBatOkState",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsTransition"), {
        type: "state",
        common: {
          name: "CriticalIsTransition",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), {
        type: "state",
        common: {
          name: "CriticalIsPrecharge",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "HeatOnState"), {
        type: "state",
        common: {
          name: "HeatOnState",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CoolOnState"), {
        type: "state",
        common: {
          name: "CoolOnState",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeOnState"), {
        type: "state",
        common: {
          name: "ChargeOnState",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeIsLimPower"), {
        type: "state",
        common: {
          name: "ChargeIsLimPower",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgOnState"), {
        type: "state",
        common: {
          name: "DischgOnState",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgIsLimPower"), {
        type: "state",
        common: {
          name: "DischgIsLimPower",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeInBypass"), {
        type: "state",
        common: {
          name: "ChargeInBypass",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), {
        type: "state",
        common: {
          name: "ChargeHasBypassTempRelief",
          type: "boolean",
          role: "value",
          read: true,
          write: true,
          states: {
            "0": "No",
            "1": "Yes"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellVolt"), {
        type: "state",
        common: {
          name: "MinCellVolt",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellVolt"), {
        type: "state",
        common: {
          name: "MaxCellVolt",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellVolt"), {
        type: "state",
        common: {
          name: "AvgCellVolt",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
        type: "state",
        common: {
          name: "MinCellTemp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellTemp"), {
        type: "state",
        common: {
          name: "MaxCellTemp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellTemp"), {
        type: "state",
        common: {
          name: "AvgCellTemp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), {
        type: "state",
        common: {
          name: "NumOfCellsInBypass",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntVoltage"), {
        type: "state",
        common: {
          name: "ShuntVoltage",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
        type: "state",
        common: {
          name: "ShuntCurrent",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "A"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntPowerVA"), {
        type: "state",
        common: {
          name: "ShuntPowerVA",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "VA"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
        type: "state",
        common: {
          name: "ShuntSOC",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "%"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), {
        type: "state",
        common: {
          name: "NomCapacityToEmpty",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "Ah"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), {
        type: "state",
        common: {
          name: "ShuntCumulkWhCharge",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "kWh"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), {
        type: "state",
        common: {
          name: "ShuntCumulkWhDischg",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "kWh"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalEvents"), {
        type: "state",
        common: {
          name: "CriticalEvents",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
        type: "state",
        common: {
          name: "SystemTime",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "GlobalSetupVers"), {
        type: "state",
        common: {
          name: "GlobalSetupVers",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "LifetimeSetupVers"), {
        type: "state",
        common: {
          name: "LifetimeSetupVers",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffBypassTicks"), {
        type: "state",
        common: {
          name: "DiffBypassTicks",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffTempTicks"), {
        type: "state",
        common: {
          name: "DiffTempTicks",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffVoltTicks"), {
        type: "state",
        common: {
          name: "DiffVoltTicks",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffLogicTicks"), {
        type: "state",
        common: {
          name: "DiffLogicTicks",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      })
    ]);
  }
  async handleMessage(systemId, msg) {
    const result = this.parser.parse(msg);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsTransition"), result.CriticalIsTransition, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), result.CriticalIsPrecharge, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ChargeOnState"), result.ChargeOnState, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ChargeIsLimPower"), result.ChargeIsLimPower, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DischgOnState"), result.DischgOnState, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DischgIsLimPower"), result.DischgIsLimPower, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ChargeInBypass"), result.ChargeInBypass, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), result.ChargeHasBypassTempRelief, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MaxCellTemp"), result.MaxCellTemp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "AvgCellTemp"), result.AvgCellTemp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), result.NumOfCellsInBypass, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntPowerVA"), result.ShuntPowerVA, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), result.NomCapacityToEmpty, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), result.ShuntCumulkWhCharge, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), result.ShuntCumulkWhDischg, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CriticalEvents"), result.CriticalEvents, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "GlobalSetupVers"), result.GlobalSetupVers, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "LifetimeSetupVers"), result.LifetimeSetupVers, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DiffBypassTicks"), result.DiffBypassTicks, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DiffTempTicks"), result.DiffTempTicks, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DiffVoltTicks"), result.DiffVoltTicks, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, "DiffLogicTicks"), result.DiffLogicTicks, true);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_3233_LiveDisplay
});
//# sourceMappingURL=parser-3233-LiveDisplay.js.map
