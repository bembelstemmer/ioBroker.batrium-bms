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
var parser_facade_exports = {};
__export(parser_facade_exports, {
  ParserFacade: () => ParserFacade
});
module.exports = __toCommonJS(parser_facade_exports);
var import_parser_base_data = require("./parser-base-data");
var import_parser_5732_SystemDiscovery = require("./parser-5732-SystemDiscovery");
var import_parser_3233_LiveDisplay = require("./parser-3233-LiveDisplay");
var import_parser_6831_QuickSessionHist = require("./parser-6831-QuickSessionHist");
var import_parser_415a_CellNodeStatus = require("./parser-415a-CellNodeStatus");
var import_parser_4232_CellNodeFull = require("./parser-4232-CellNodeFull");
class ParserFacade {
  constructor(adapter) {
    this.knownSystems = [];
    this.knownSystemMessages = [];
    this.adapter = adapter;
    this.parserBaseData = new import_parser_base_data.ParserBaseData();
    this.parserMap = /* @__PURE__ */ new Map();
    this.parserMap.set("3233", new import_parser_3233_LiveDisplay.Parser_3233_LiveDisplay(this.adapter));
    this.parserMap.set("415a", new import_parser_415a_CellNodeStatus.Parser_415a_CellNodeStatus(this.adapter));
    this.parserMap.set("4232", new import_parser_4232_CellNodeFull.Parser_4232_CellNodeFull(this.adapter));
    this.parserMap.set("5732", new import_parser_5732_SystemDiscovery.Parser_5732_SystemDiscovery(this.adapter));
    this.parserMap.set("6831", new import_parser_6831_QuickSessionHist.Parser_6831_QuickSessionHist(this.adapter));
  }
  getMessageBaseData(buf) {
    return this.parserBaseData.parse(buf);
  }
  async createSystemNode(systemId) {
    var _a, _b, _c;
    await ((_c = this.adapter) == null ? void 0 : _c.setObjectNotExistsAsync(`${(_a = this.adapter) == null ? void 0 : _a.name}.${(_b = this.adapter) == null ? void 0 : _b.instance.toString()}.${systemId.toString()}`, {
      type: "device",
      common: {
        name: "Batrium Device #" + systemId.toString()
      },
      native: {}
    }));
  }
  async createSystemMessageNode(systemId, messageId) {
    var _a, _b, _c, _d, _e;
    2;
    await ((_e = this.adapter) == null ? void 0 : _e.setObjectNotExistsAsync(`${(_a = this.adapter) == null ? void 0 : _a.name}.${(_b = this.adapter) == null ? void 0 : _b.instance.toString()}.${systemId.toString()}.${messageId}`, {
      type: "channel",
      common: {
        name: (_d = (_c = this.parserMap.get(messageId)) == null ? void 0 : _c.getMessageName()) != null ? _d : "Unknown Type"
      },
      native: {}
    }));
  }
  async handleMessage(systemId, messageID, msg) {
    var _a, _b;
    if (!this.parserMap.has(messageID)) {
      this.adapter.log.debug(`Unknown MessageID ${messageID} received`);
      return false;
    }
    if (!this.knownSystems.includes(systemId.toString())) {
      await this.createSystemNode(systemId);
      this.knownSystems.push(systemId.toString());
    }
    const cachekey = systemId.toString() + "." + messageID;
    if (!this.knownSystemMessages.includes(cachekey)) {
      await this.createSystemMessageNode(systemId, messageID);
      await ((_a = this.parserMap.get(messageID)) == null ? void 0 : _a.initObjects(systemId));
      this.knownSystemMessages.push(cachekey);
    }
    return !!((_b = this.parserMap.get(messageID)) == null ? void 0 : _b.handleMessage(systemId, msg));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParserFacade
});
//# sourceMappingURL=parser-facade.js.map
