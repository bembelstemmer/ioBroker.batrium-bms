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
var parser_5732_SystemDiscovery_exports = {};
__export(parser_5732_SystemDiscovery_exports, {
  Parser_5732_SystemDiscovery: () => Parser_5732_SystemDiscovery
});
module.exports = __toCommonJS(parser_5732_SystemDiscovery_exports);
var import_binary_parser = require("binary-parser");
var import_parser_common = require("./parser-common");
class Parser_5732_SystemDiscovery extends import_parser_common.ParserCommon {
  constructor(adapter) {
    super();
    this.adapter = adapter;
    this.messageId = "5732";
    this.messageName = "System Discovery message";
    this.parser = new import_binary_parser.Parser().skip(8).string("SystemCode", { encoding: "utf8", length: 8, stripNull: true }).int16le("SystemFirmwareVersion").int16le("SystemHardwareVersion").int32le("SystemTime").uint8("SystemOpStatus").uint8("SystemAuthMode").uint8("CriticalBatOkState").uint8("ChargePowerRateState").uint8("DischargePowerRateState").uint8("HeatOnState").uint8("CoolOnState").int16le("MinCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("MaxCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).int16le("AvgCellVolt", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("MinCellTemp", { formatter: (x) => {
      return x - 40;
    } }).uint8("NumOfCellsActive").uint8("CmuRxOpStatusUSN").uint8("CmuPollerMode").uint8("ShuntSOC", { formatter: (x) => {
      return x / 2 - 5;
    } }).int16le("ShuntVoltage", { formatter: (x) => {
      return x / 100;
    } }).floatle("ShuntCurrent", { formatter: (x) => {
      return x / 1e3;
    } }).uint8("ShuntStatus").uint8("ShuntRxAmpTicks");
  }
  async initObjects(systemId) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    await Promise.all([
      (_a = this.adapter) == null ? void 0 : _a.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemCode"), {
        type: "state",
        common: {
          name: "SystemCode",
          type: "string",
          role: "common",
          read: true,
          write: true
        },
        native: {}
      }),
      (_b = this.adapter) == null ? void 0 : _b.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), {
        type: "state",
        common: {
          name: "SystemFirmwareVersion",
          type: "number",
          role: "indicator",
          read: true,
          write: true
        },
        native: {}
      }),
      (_c = this.adapter) == null ? void 0 : _c.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemHardwareVersion"), {
        type: "state",
        common: {
          name: "SystemHardwareVersion",
          type: "number",
          role: "indicator",
          read: true,
          write: true
        },
        native: {}
      }),
      (_d = this.adapter) == null ? void 0 : _d.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
        type: "state",
        common: {
          name: "SystemTime",
          type: "number",
          role: "common",
          read: true,
          write: true
        },
        native: {}
      }),
      (_e = this.adapter) == null ? void 0 : _e.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
        type: "state",
        common: {
          name: "SystemOpStatus",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_f = this.adapter) == null ? void 0 : _f.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemAuthMode"), {
        type: "state",
        common: {
          name: "SystemAuthMode",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_g = this.adapter) == null ? void 0 : _g.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalBatOkState"), {
        type: "state",
        common: {
          name: "CriticalBatOkState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_h = this.adapter) == null ? void 0 : _h.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargePowerRateState"), {
        type: "state",
        common: {
          name: "ChargePowerRateState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_i = this.adapter) == null ? void 0 : _i.setObjectNotExistsAsync(this.getVariableName(systemId, "DischargePowerRateState"), {
        type: "state",
        common: {
          name: "DischargePowerRateState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_j = this.adapter) == null ? void 0 : _j.setObjectNotExistsAsync(this.getVariableName(systemId, "HeatOnState"), {
        type: "state",
        common: {
          name: "HeatOnState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_k = this.adapter) == null ? void 0 : _k.setObjectNotExistsAsync(this.getVariableName(systemId, "CoolOnState"), {
        type: "state",
        common: {
          name: "CoolOnState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_l = this.adapter) == null ? void 0 : _l.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellVolt"), {
        type: "state",
        common: {
          name: "MinCellVolt",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_m = this.adapter) == null ? void 0 : _m.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellVolt"), {
        type: "state",
        common: {
          name: "MaxCellVolt",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_n = this.adapter) == null ? void 0 : _n.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellVolt"), {
        type: "state",
        common: {
          name: "AvgCellVolt",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_o = this.adapter) == null ? void 0 : _o.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
        type: "state",
        common: {
          name: "MinCellTemp",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      (_p = this.adapter) == null ? void 0 : _p.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsActive"), {
        type: "state",
        common: {
          name: "NumOfCellsActive",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_q = this.adapter) == null ? void 0 : _q.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), {
        type: "state",
        common: {
          name: "CmuRxOpStatusUSN",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_r = this.adapter) == null ? void 0 : _r.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuPollerMode"), {
        type: "state",
        common: {
          name: "CmuPollerMode",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_s = this.adapter) == null ? void 0 : _s.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
        type: "state",
        common: {
          name: "ShuntSOC",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "%"
        },
        native: {}
      }),
      (_t = this.adapter) == null ? void 0 : _t.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntVoltage"), {
        type: "state",
        common: {
          name: "ShuntVoltage",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_u = this.adapter) == null ? void 0 : _u.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
        type: "state",
        common: {
          name: "ShuntCurrent",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "A"
        },
        native: {}
      }),
      (_v = this.adapter) == null ? void 0 : _v.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntStatus"), {
        type: "state",
        common: {
          name: "ShuntVoltage",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_w = this.adapter) == null ? void 0 : _w.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), {
        type: "state",
        common: {
          name: "ShuntRxAmpTicks",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      })
    ]);
  }
  async handleMessage(systemId, msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const result = (_a = this.parser) == null ? void 0 : _a.parse(msg);
    (_b = this.adapter) == null ? void 0 : _b.setStateChangedAsync(this.getVariableName(systemId, "SystemCode"), result.SystemCode, true);
    (_c = this.adapter) == null ? void 0 : _c.setStateChangedAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), result.SystemFirmwareVersion, true);
    (_d = this.adapter) == null ? void 0 : _d.setStateChangedAsync(this.getVariableName(systemId, "SystemHardwareVersion"), result.SystemHardwareVersion, true);
    (_e = this.adapter) == null ? void 0 : _e.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
    (_f = this.adapter) == null ? void 0 : _f.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
    (_g = this.adapter) == null ? void 0 : _g.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
    (_h = this.adapter) == null ? void 0 : _h.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
    (_i = this.adapter) == null ? void 0 : _i.setStateChangedAsync(this.getVariableName(systemId, "ChargePowerRateState"), result.ChargePowerRateState, true);
    (_j = this.adapter) == null ? void 0 : _j.setStateChangedAsync(this.getVariableName(systemId, "DischargePowerRateState"), result.DischargePowerRateState, true);
    (_k = this.adapter) == null ? void 0 : _k.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
    (_l = this.adapter) == null ? void 0 : _l.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
    (_m = this.adapter) == null ? void 0 : _m.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
    (_n = this.adapter) == null ? void 0 : _n.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
    (_o = this.adapter) == null ? void 0 : _o.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
    (_p = this.adapter) == null ? void 0 : _p.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
    (_q = this.adapter) == null ? void 0 : _q.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsActive"), result.NumOfCellsActive, true);
    (_r = this.adapter) == null ? void 0 : _r.setStateChangedAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), result.CmuRxOpStatusUSN, true);
    (_s = this.adapter) == null ? void 0 : _s.setStateChangedAsync(this.getVariableName(systemId, "CmuPollerMode"), result.CmuPollerMode, true);
    (_t = this.adapter) == null ? void 0 : _t.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
    (_u = this.adapter) == null ? void 0 : _u.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
    (_v = this.adapter) == null ? void 0 : _v.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
    (_w = this.adapter) == null ? void 0 : _w.setStateChangedAsync(this.getVariableName(systemId, "ShuntStatus"), result.ShuntStatus, true);
    (_x = this.adapter) == null ? void 0 : _x.setStateChangedAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), result.ShuntRxAmpTicks, true);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_5732_SystemDiscovery
});
//# sourceMappingURL=parser-5732-SystemDiscovery.js.map
