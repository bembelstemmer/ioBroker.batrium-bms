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
var parser_4232_CellNodeFull_exports = {};
__export(parser_4232_CellNodeFull_exports, {
  Parser_4232_CellNodeFull: () => Parser_4232_CellNodeFull
});
module.exports = __toCommonJS(parser_4232_CellNodeFull_exports);
var import_binary_parser = require("binary-parser");
var import_parser_common = require("./parser-common");
class Parser_4232_CellNodeFull extends import_parser_common.ParserCommon {
  constructor(adapter) {
    super(adapter);
    this.initializedCellNodes = [];
    this.adapter = adapter;
    this.messageId = "4232";
    this.messageName = "Cell Node Full";
    this.parser = new import_binary_parser.Parser().skip(8).uint8("ID").uint8("USN").int16le("MinCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("MaxCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("MinCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("BypassTemp", { formatter: (x) => {
      return x - 40;
    } }).int16le("BypassAmp", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("DataErrorCounter").uint8("ResetCounter").uint8("Status").uint8("IsOverdue").int16le("LoCellVoltAlert", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("HiCellVoltAlert", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("BypassVoltLevel", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("BypassAmpLimit", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("BypassTempLimit", { formatter: (x) => {
      return x - 40;
    } }).uint8("HiCellTempAlert", { formatter: (x) => {
      return x - 40;
    } }).uint8("RawVoltCalOffset").int16le("FwVers").int16le("HwVers").int16le("BootVers").uint32le("SerialNo").uint32le("BypassInitialDate").floatle("BypassSessionAh", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("RepeatCellV");
  }
  async initObjects(_systemId) {
    return;
  }
  async initCellNode(systemId, id) {
    var _a;
    this.adapter.log.debug(`Setting Cell${id}`);
    await ((_a = this.adapter) == null ? void 0 : _a.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}`), {
      type: "device",
      common: {
        name: "Batrium Cell #" + id.toString()
      },
      native: {}
    }));
    await Promise.all([
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.ID`), {
        type: "state",
        common: {
          name: "ID",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.USN`), {
        type: "state",
        common: {
          name: "USN",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellVolt`), {
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
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MaxCellVolt`), {
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
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.MinCellTemp`), {
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
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassTemp`), {
        type: "state",
        common: {
          name: "BypassTemp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassAmp`), {
        type: "state",
        common: {
          name: "BypassAmp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "A"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.DataErrorCounter`), {
        type: "state",
        common: {
          name: "DataErrorCounter",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.ResetCounter`), {
        type: "state",
        common: {
          name: "ResetCounter",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
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
            "12": "CellOutLimits"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.IsOverdue`), {
        type: "state",
        common: {
          name: "IsOverdue",
          type: "boolean",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.LoCellVoltAlert`), {
        type: "state",
        common: {
          name: "LoCellVoltAlert",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HiCellVoltAlert`), {
        type: "state",
        common: {
          name: "HiCellVoltAlert",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassVoltLevel`), {
        type: "state",
        common: {
          name: "BypassVoltLevel",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassAmpLimit`), {
        type: "state",
        common: {
          name: "BypassAmpLimit",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "A"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassTempLimit`), {
        type: "state",
        common: {
          name: "BypassTempLimit",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HiCellTempAlert`), {
        type: "state",
        common: {
          name: "HiCellTempAlert",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.RawVoltCalOffset`), {
        type: "state",
        common: {
          name: "RawVoltCalOffset",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.FwVers`), {
        type: "state",
        common: {
          name: "FwVers",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.HwVers`), {
        type: "state",
        common: {
          name: "HwVers",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BootVers`), {
        type: "state",
        common: {
          name: "BootVers",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.SerialNo`), {
        type: "state",
        common: {
          name: "SerialNo",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassInitialDate`), {
        type: "state",
        common: {
          name: "BypassInitialDate",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.BypassSessionAh`), {
        type: "state",
        common: {
          name: "BypassSessionAh",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "Ah"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, `${id}.RepeatCellV`), {
        type: "state",
        common: {
          name: "RepeatCellV",
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
    if (!this.adapter.config["4232_active"] || this.ratelimitTimeout) {
      return;
    }
    this.ratelimitTimeout = this.adapter.setTimeout(() => {
      this.ratelimitTimeout = null;
    }, this.adapter.config["4232_ratelimit"]);
    const result = this.parser.parse(msg);
    if (!this.initializedCellNodes.includes(result.ID)) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_4232_CellNodeFull
});
//# sourceMappingURL=parser-4232-CellNodeFull.js.map
