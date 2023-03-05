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
var parser_6831_QuickSessionHist_exports = {};
__export(parser_6831_QuickSessionHist_exports, {
  Parser_6831_QuickSessionHist: () => Parser_6831_QuickSessionHist
});
module.exports = __toCommonJS(parser_6831_QuickSessionHist_exports);
var import_binary_parser = require("binary-parser");
var import_parser_common = require("./parser-common");
class Parser_6831_QuickSessionHist extends import_parser_common.ParserCommon {
  constructor(adapter) {
    super(adapter);
    this.adapter = adapter;
    this.messageId = "6831";
    this.messageName = "Quick session history";
    this.parser = new import_binary_parser.Parser().skip(8).int16le("QuickSessionHistId").uint32le("QuickSessionHistTime").uint8("QuickSessionHistSystemOpState").uint8("QuickSessionHistControlLogic").int16le("QuickSessionHistMinCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("QuickSessionHistMaxCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("QuickSessionHistAvgCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("QuickSessionHistAvgCellTemp", { formatter: (x) => {
      return x - 40;
    } }).int16le("QuickSessionHistSocHiRes", { formatter: (x) => {
      return x / 100;
    } }).int16le("QuickSessionHistShuntVolt", { formatter: (x) => {
      return x / 100;
    } }).floatle("QuickSessionHistShuntAmp", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("QuickSessionHistNumOfCellsInBypass");
  }
  async initObjects(systemId) {
    await Promise.all([
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistId"), {
        type: "state",
        common: {
          name: "QuickSessionHistId",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistTime"), {
        type: "state",
        common: {
          name: "QuickSessionHistTime",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
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
            "11": "Shunt Timeout"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistControlLogic"), {
        type: "state",
        common: {
          name: "QuickSessionHistControlLogic",
          type: "number",
          role: "value",
          read: true,
          write: true
        },
        native: {}
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
        native: {}
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
        native: {}
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
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistAvgCellTemp"), {
        type: "state",
        common: {
          name: "QuickSessionHistAvgCellTemp",
          type: "number",
          role: "value",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
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
        native: {}
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
        native: {}
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
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "QuickSessionHistNumOfCellsInBypass"), {
        type: "state",
        common: {
          name: "QuickSessionHistNumOfCellsInBypass",
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
    if (!this.adapter.config["6831_active"] || this.ratelimitTimeout) {
      return;
    }
    this.ratelimitTimeout = this.adapter.setTimeout(() => {
      this.ratelimitTimeout = null;
    }, this.adapter.config["6831_ratelimit"]);
    const result = this.parser.parse(msg);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_6831_QuickSessionHist
});
//# sourceMappingURL=parser-6831-QuickSessionHist.js.map
