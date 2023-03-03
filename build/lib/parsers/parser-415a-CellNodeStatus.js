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
var parser_415a_CellNodeStatus_exports = {};
__export(parser_415a_CellNodeStatus_exports, {
  Parser_415a_CellNodeStatus: () => Parser_415a_CellNodeStatus
});
module.exports = __toCommonJS(parser_415a_CellNodeStatus_exports);
var import_binary_parser = require("binary-parser");
var import_parser_common = require("./parser-common");
class Parser_415a_CellNodeStatus extends import_parser_common.ParserCommon {
  constructor(adapter) {
    super(adapter);
    this.initializedCellNodes = [];
    this.ratelimitTimeout = null;
    this.adapter = adapter;
    this.messageId = "415a";
    this.messageName = "Cell Node Status Limited";
    this.subParser = new import_binary_parser.Parser().uint8("ID").uint8("USN").int16le("MinCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("MaxCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("MinCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("BypassTemp", { formatter: (x) => {
      return x - 40;
    } }).int16le("BypassAmp", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("Status");
    this.parser = new import_binary_parser.Parser().skip(8).uint8("CmuRxOpStatusNodeID").uint8("Records").uint8("FirstNodeID").uint8("LastNodeID").array("nodes", {
      type: this.subParser,
      length: "Records"
    });
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
      })
    ]);
  }
  async setCellValues(systemId, cellData) {
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.ID`), cellData.ID, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.USN`), cellData.USN, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MinCellVolt`), cellData.MinCellVolt, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MaxCellVolt`), cellData.MaxCellVolt, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.MinCellTemp`), cellData.MinCellTemp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.BypassTemp`), cellData.BypassTemp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.BypassAmp`), cellData.BypassAmp, true);
    this.adapter.setStateChangedAsync(this.getVariableName(systemId, `${cellData.ID}.Status`), cellData.Status, true);
  }
  async handleMessage(systemId, msg) {
    if (!this.ratelimitTimeout) {
      this.ratelimitTimeout = this.adapter.setTimeout(() => {
        this.ratelimitTimeout = null;
        const result = this.parser.parse(msg);
        result.nodes.forEach(async (nodeData) => {
          if (!this.initializedCellNodes.includes(nodeData.ID)) {
            await this.initCellNode(systemId, nodeData.ID);
            this.initializedCellNodes.push(nodeData.ID);
          }
        });
        result.nodes.forEach(async (nodeData) => {
          this.setCellValues(systemId, nodeData);
        });
      }, 1e3);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_415a_CellNodeStatus
});
//# sourceMappingURL=parser-415a-CellNodeStatus.js.map
