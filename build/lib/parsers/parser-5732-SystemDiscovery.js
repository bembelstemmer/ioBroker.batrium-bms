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
  parser;
  constructor(adapter) {
    super(adapter);
    this.adapter = adapter;
    this.messageId = "5732";
    this.messageName = "System Discovery message";
    this.parser = new import_binary_parser.Parser().skip(8).string("SystemCode", { encoding: "utf8", length: 8, stripNull: true }).int16le("SystemFirmwareVersion").int16le("SystemHardwareVersion").int32le("SystemTime").uint8("SystemOpStatus").uint8("SystemAuthMode").uint8("CriticalBatOkState").uint8("ChargePowerRateState").uint8("DischargePowerRateState").uint8("HeatOnState").uint8("CoolOnState").int16le("MinCellVolt", {
      formatter: (x) => {
        return x / 1e3;
      }
    }).int16le("MaxCellVolt", {
      formatter: (x) => {
        return x / 1e3;
      }
    }).int16le("AvgCellVolt", {
      formatter: (x) => {
        return x / 1e3;
      }
    }).uint8("MinCellTemp", {
      formatter: (x) => {
        return x - 40;
      }
    }).uint8("NumOfCellsActive").uint8("CmuRxOpStatusUSN").uint8("CmuPollerMode").uint8("ShuntSOC", {
      formatter: (x) => {
        return x / 2 - 5;
      }
    }).int16le("ShuntVoltage", {
      formatter: (x) => {
        return x / 100;
      }
    }).floatle("ShuntCurrent", {
      formatter: (x) => {
        return x / 1e3;
      }
    }).uint8("ShuntStatus").uint8("ShuntRxAmpTicks");
  }
  async initObjects(systemId) {
    await Promise.all([
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemCode"), {
        type: "state",
        common: {
          name: "SystemCode",
          type: "string",
          role: "info.name",
          read: true,
          write: false
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemFirmwareVersion"), {
        type: "state",
        common: {
          name: "SystemFirmwareVersion",
          type: "number",
          role: "info.firmware",
          read: true,
          write: false
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemHardwareVersion"), {
        type: "state",
        common: {
          name: "SystemHardwareVersion",
          type: "number",
          role: "info.hardware",
          read: true,
          write: false
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "SystemTime"), {
        type: "state",
        common: {
          name: "SystemTime",
          type: "number",
          role: "date",
          read: true,
          write: false
        },
        native: {}
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
            0: "Simulator",
            1: "Idle",
            2: "Discharging",
            3: "SoC Empty",
            4: "Charging",
            5: "Full",
            6: "Timeout",
            7: "Critical Pending",
            8: "Critical Offline",
            9: "Mqtt Offline",
            10: "Auth Setup",
            11: "Shunt Timeout"
          }
        },
        native: {}
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
            0: "Default",
            1: "Technician",
            2: "Factory"
          }
        },
        native: {}
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
            0: "Off",
            1: "On"
          }
        },
        native: {}
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
            0: "Off",
            2: "Limited Power",
            4: "Normal Power"
          }
        },
        native: {}
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
            0: "Off",
            2: "Limited Power",
            4: "Normal Power"
          }
        },
        native: {}
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
            0: "Off",
            1: "On"
          }
        },
        native: {}
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
            0: "Off",
            1: "On"
          }
        },
        native: {}
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
        native: {}
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
        native: {}
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
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "MinCellTemp"), {
        type: "state",
        common: {
          name: "MinCellTemp",
          type: "number",
          role: "value.temperature",
          read: true,
          write: false,
          unit: "\xB0C"
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "NumOfCellsActive"), {
        type: "state",
        common: {
          name: "NumOfCellsActive",
          type: "number",
          role: "value",
          read: true,
          write: false
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "CmuRxOpStatusUSN"), {
        type: "state",
        common: {
          name: "CmuRxOpStatusUSN",
          type: "number",
          role: "value",
          read: true,
          write: false
        },
        native: {}
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
            0: "Idle",
            1: "Normal",
            2: "Collection Start",
            3: "Collection Running",
            4: "Sync Start",
            5: "Sync Running",
            6: "NetworkTest Start",
            7: "NetworkTest Running",
            8: "BypassTest Start",
            9: "BypassTest Running",
            10: "RebootAll Start",
            11: "Rebooting AllDevices",
            12: "Simulator Start",
            13: "Simulator Running"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntSOC"), {
        type: "state",
        common: {
          name: "ShuntSOC",
          type: "number",
          role: "value.battery",
          read: true,
          write: false,
          unit: "%"
        },
        native: {}
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
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntCurrent"), {
        type: "state",
        common: {
          name: "ShuntCurrent",
          type: "number",
          role: "value.current",
          read: true,
          write: false,
          unit: "A"
        },
        native: {}
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
            0: "Timeout",
            1: "Discharging",
            2: "Idle",
            4: "Charging"
          }
        },
        native: {}
      }),
      this.adapter.setObjectNotExistsAsync(this.getVariableName(systemId, "ShuntRxAmpTicks"), {
        type: "state",
        common: {
          name: "ShuntRxAmpTicks",
          type: "number",
          role: "value",
          read: true,
          write: false
        },
        native: {}
      })
    ]);
  }
  handleMessage(systemId, msg) {
    if (!this.adapter.config["5732_active"] || this.ratelimitTimeout) {
      return;
    }
    this.ratelimitTimeout = this.adapter.setTimeout(() => {
      this.ratelimitTimeout = void 0;
    }, this.adapter.config["5732_ratelimit"]);
    const result = this.parser.parse(msg);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemCode"), result.SystemCode, true);
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "SystemFirmwareVersion"),
      result.SystemFirmwareVersion,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "SystemHardwareVersion"),
      result.SystemHardwareVersion,
      true
    );
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "SystemTime"), result.SystemTime, true);
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "SystemOpStatus"),
      result.SystemOpStatus,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "SystemAuthMode"),
      result.SystemAuthMode,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "CriticalBatOkState"),
      result.CriticalBatOkState,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "ChargePowerRateState"),
      result.ChargePowerRateState,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "DischargePowerRateState"),
      result.DischargePowerRateState,
      true
    );
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "HeatOnState"), result.HeatOnState, true);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "CoolOnState"), result.CoolOnState, true);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellVolt"), result.MinCellVolt, true);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MaxCellVolt"), result.MaxCellVolt, true);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "AvgCellVolt"), result.AvgCellVolt, true);
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "MinCellTemp"), result.MinCellTemp, true);
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "NumOfCellsActive"),
      result.NumOfCellsActive,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "CmuRxOpStatusUSN"),
      result.CmuRxOpStatusUSN,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "CmuPollerMode"),
      result.CmuPollerMode,
      true
    );
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntSOC"), result.ShuntSOC, true);
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "ShuntVoltage"),
      result.ShuntVoltage,
      true
    );
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "ShuntCurrent"),
      result.ShuntCurrent,
      true
    );
    void this.adapter.setStateChangedAsync(this.getVariableName(systemId, "ShuntStatus"), result.ShuntStatus, true);
    void this.adapter.setStateChangedAsync(
      this.getVariableName(systemId, "ShuntRxAmpTicks"),
      result.ShuntRxAmpTicks,
      true
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Parser_5732_SystemDiscovery
});
//# sourceMappingURL=parser-5732-SystemDiscovery.js.map
