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
    super();
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I;
    await Promise.all([
      (_a = this.adapter) == null ? void 0 : _a.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemOpStatus"), {
        type: "state",
        common: {
          name: "SystemOpStatus",
          type: "string",
          role: "common",
          read: true,
          write: true
        },
        native: {}
      }),
      (_b = this.adapter) == null ? void 0 : _b.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemAuthMode"), {
        type: "state",
        common: {
          name: "SystemAuthMode",
          type: "number",
          role: "indicator",
          read: true,
          write: true
        },
        native: {}
      }),
      (_c = this.adapter) == null ? void 0 : _c.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalBatOkState"), {
        type: "state",
        common: {
          name: "CriticalBatOkState",
          type: "number",
          role: "indicator",
          read: true,
          write: true
        },
        native: {}
      }),
      (_d = this.adapter) == null ? void 0 : _d.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsTransition"), {
        type: "state",
        common: {
          name: "CriticalIsTransition",
          type: "number",
          role: "common",
          read: true,
          write: true
        },
        native: {}
      }),
      (_e = this.adapter) == null ? void 0 : _e.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), {
        type: "state",
        common: {
          name: "CriticalIsPrecharge",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_f = this.adapter) == null ? void 0 : _f.setObjectNotExistsAsync(this.getVariableName(systemId, "HeatOnState"), {
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
      (_g = this.adapter) == null ? void 0 : _g.setObjectNotExistsAsync(this.getVariableName(systemId, "CoolOnState"), {
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
      (_h = this.adapter) == null ? void 0 : _h.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeOnState"), {
        type: "state",
        common: {
          name: "ChargeOnState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_i = this.adapter) == null ? void 0 : _i.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeIsLimPower"), {
        type: "state",
        common: {
          name: "ChargeIsLimPower",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_j = this.adapter) == null ? void 0 : _j.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgOnState"), {
        type: "state",
        common: {
          name: "DischgOnState",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_k = this.adapter) == null ? void 0 : _k.setObjectNotExistsAsync(this.getVariableName(systemId, "DischgIsLimPower"), {
        type: "state",
        common: {
          name: "DischgIsLimPower",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_l = this.adapter) == null ? void 0 : _l.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeInBypass"), {
        type: "state",
        common: {
          name: "ChargeInBypass",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_m = this.adapter) == null ? void 0 : _m.setObjectNotExistsAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), {
        type: "state",
        common: {
          name: "ChargeHasBypassTempRelief",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_n = this.adapter) == null ? void 0 : _n.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellVolt"), {
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
      (_o = this.adapter) == null ? void 0 : _o.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellVolt"), {
        type: "state",
        common: {
          name: "MaxCellVolt",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "\xB0C"
        },
        native: {}
      }),
      (_p = this.adapter) == null ? void 0 : _p.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellVolt"), {
        type: "state",
        common: {
          name: "AvgCellVolt",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_q = this.adapter) == null ? void 0 : _q.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
        type: "state",
        common: {
          name: "MinCellTemp",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_r = this.adapter) == null ? void 0 : _r.setObjectNotExistsAsync(this.getVariableName(systemId, "MaxCellTemp"), {
        type: "state",
        common: {
          name: "MaxCellTemp",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_s = this.adapter) == null ? void 0 : _s.setObjectNotExistsAsync(this.getVariableName(systemId, "AvgCellTemp"), {
        type: "state",
        common: {
          name: "AvgCellTemp",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "%"
        },
        native: {}
      }),
      (_t = this.adapter) == null ? void 0 : _t.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), {
        type: "state",
        common: {
          name: "NumOfCellsInBypass",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "V"
        },
        native: {}
      }),
      (_u = this.adapter) == null ? void 0 : _u.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntVoltage"), {
        type: "state",
        common: {
          name: "ShuntVoltage",
          type: "number",
          role: "level",
          read: true,
          write: true,
          unit: "A"
        },
        native: {}
      }),
      (_v = this.adapter) == null ? void 0 : _v.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
        type: "state",
        common: {
          name: "ShuntCurrent",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_w = this.adapter) == null ? void 0 : _w.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntPowerVA"), {
        type: "state",
        common: {
          name: "ShuntPowerVA",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_x = this.adapter) == null ? void 0 : _x.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
        type: "state",
        common: {
          name: "ShuntSOC",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_y = this.adapter) == null ? void 0 : _y.setObjectNotExistsAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), {
        type: "state",
        common: {
          name: "NomCapacityToEmpty",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_z = this.adapter) == null ? void 0 : _z.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), {
        type: "state",
        common: {
          name: "ShuntCumulkWhCharge",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_A = this.adapter) == null ? void 0 : _A.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), {
        type: "state",
        common: {
          name: "ShuntCumulkWhDischg",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_B = this.adapter) == null ? void 0 : _B.setObjectNotExistsAsync(this.getVariableName(systemId, "CriticalEvents"), {
        type: "state",
        common: {
          name: "CriticalEvents",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_C = this.adapter) == null ? void 0 : _C.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
        type: "state",
        common: {
          name: "SystemTime",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_D = this.adapter) == null ? void 0 : _D.setObjectNotExistsAsync(this.getVariableName(systemId, "GlobalSetupVers"), {
        type: "state",
        common: {
          name: "GlobalSetupVers",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_E = this.adapter) == null ? void 0 : _E.setObjectNotExistsAsync(this.getVariableName(systemId, "LifetimeSetupVers"), {
        type: "state",
        common: {
          name: "LifetimeSetupVers",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_F = this.adapter) == null ? void 0 : _F.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffBypassTicks"), {
        type: "state",
        common: {
          name: "DiffBypassTicks",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_G = this.adapter) == null ? void 0 : _G.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffTempTicks"), {
        type: "state",
        common: {
          name: "DiffTempTicks",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_H = this.adapter) == null ? void 0 : _H.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffVoltTicks"), {
        type: "state",
        common: {
          name: "DiffVoltTicks",
          type: "number",
          role: "level",
          read: true,
          write: true
        },
        native: {}
      }),
      (_I = this.adapter) == null ? void 0 : _I.setObjectNotExistsAsync(this.getVariableName(systemId, "DiffLogicTicks"), {
        type: "state",
        common: {
          name: "DiffLogicTicks",
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
    const result = (_a = this.parser) == null ? void 0 : _a.parse(msg);
    (_b = this.adapter) == null ? void 0 : _b.setStateChangedAsync(this.getVariableName(systemId, "SystemOpStatus"), result.SystemOpStatus, true);
    (_c = this.adapter) == null ? void 0 : _c.setStateChangedAsync(this.getVariableName(systemId, "SystemAuthMode"), result.SystemAuthMode, true);
    (_d = this.adapter) == null ? void 0 : _d.setStateChangedAsync(this.getVariableName(systemId, "CriticalBatOkState"), result.CriticalBatOkState, true);
    (_e = this.adapter) == null ? void 0 : _e.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsTransition"), result.CriticalIsTransition, true);
    (_f = this.adapter) == null ? void 0 : _f.setStateChangedAsync(this.getVariableName(systemId, "CriticalIsPrecharge"), result.CriticalIsPrecharge, true);
    (_g = this.adapter) == null ? void 0 : _g.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
    (_h = this.adapter) == null ? void 0 : _h.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
    (_i = this.adapter) == null ? void 0 : _i.setStateChangedAsync(this.getVariableName(systemId, "ChargeOnState"), result.ChargeOnState, true);
    (_j = this.adapter) == null ? void 0 : _j.setStateChangedAsync(this.getVariableName(systemId, "ChargeIsLimPower"), result.ChargeIsLimPower, true);
    (_k = this.adapter) == null ? void 0 : _k.setStateChangedAsync(this.getVariableName(systemId, "DischgOnState"), result.DischgOnState, true);
    (_l = this.adapter) == null ? void 0 : _l.setStateChangedAsync(this.getVariableName(systemId, "DischgIsLimPower"), result.DischgIsLimPower, true);
    (_m = this.adapter) == null ? void 0 : _m.setStateChangedAsync(this.getVariableName(systemId, "ChargeInBypass"), result.ChargeInBypass, true);
    (_n = this.adapter) == null ? void 0 : _n.setStateChangedAsync(this.getVariableName(systemId, "ChargeHasBypassTempRelief"), result.ChargeHasBypassTempRelief, true);
    (_o = this.adapter) == null ? void 0 : _o.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
    (_p = this.adapter) == null ? void 0 : _p.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
    (_q = this.adapter) == null ? void 0 : _q.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
    (_r = this.adapter) == null ? void 0 : _r.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
    (_s = this.adapter) == null ? void 0 : _s.setStateChangedAsync(this.getVariableName(systemId, "MaxCellTemp"), result.MaxCellTemp, true);
    (_t = this.adapter) == null ? void 0 : _t.setStateChangedAsync(this.getVariableName(systemId, "AvgCellTemp"), result.AvgCellTemp, true);
    (_u = this.adapter) == null ? void 0 : _u.setStateChangedAsync(this.getVariableName(systemId, "NumOfCellsInBypass"), result.NumOfCellsInBypass, true);
    (_v = this.adapter) == null ? void 0 : _v.setStateChangedAsync(this.getVariableName(systemId, "ShuntVoltage"), result.ShuntVoltage, true);
    (_w = this.adapter) == null ? void 0 : _w.setStateChangedAsync(this.getVariableName(systemId, "ShuntCurrent"), result.ShuntCurrent, true);
    (_x = this.adapter) == null ? void 0 : _x.setStateChangedAsync(this.getVariableName(systemId, "ShuntPowerVA"), result.ShuntPowerVA, true);
    (_y = this.adapter) == null ? void 0 : _y.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
    (_z = this.adapter) == null ? void 0 : _z.setStateChangedAsync(this.getVariableName(systemId, "NomCapacityToEmpty"), result.NomCapacityToEmpty, true);
    (_A = this.adapter) == null ? void 0 : _A.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhCharge"), result.ShuntCumulkWhCharge, true);
    (_B = this.adapter) == null ? void 0 : _B.setStateChangedAsync(this.getVariableName(systemId, "ShuntCumulkWhDischg"), result.ShuntCumulkWhDischg, true);
    (_C = this.adapter) == null ? void 0 : _C.setStateChangedAsync(this.getVariableName(systemId, "CriticalEvents"), result.CriticalEvents, true);
    (_D = this.adapter) == null ? void 0 : _D.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
    (_E = this.adapter) == null ? void 0 : _E.setStateChangedAsync(this.getVariableName(systemId, "GlobalSetupVers"), result.GlobalSetupVers, true);
    (_F = this.adapter) == null ? void 0 : _F.setStateChangedAsync(this.getVariableName(systemId, "LifetimeSetupVers"), result.LifetimeSetupVers, true);
    (_G = this.adapter) == null ? void 0 : _G.setStateChangedAsync(this.getVariableName(systemId, "DiffBypassTicks"), result.DiffBypassTicks, true);
    (_H = this.adapter) == null ? void 0 : _H.setStateChangedAsync(this.getVariableName(systemId, "DiffTempTicks"), result.DiffTempTicks, true);
    (_I = this.adapter) == null ? void 0 : _I.setStateChangedAsync(this.getVariableName(systemId, "DiffVoltTicks"), result.DiffVoltTicks, true);
    (_J = this.adapter) == null ? void 0 : _J.setStateChangedAsync(this.getVariableName(systemId, "DiffLogicTicks"), result.DiffLogicTicks, true);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_3233_LiveDisplay
});
//# sourceMappingURL=parser-3233-LiveDisplay.js.map
