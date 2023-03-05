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
var parser_common_exports = {};
__export(parser_common_exports, {
  ParserCommon: () => ParserCommon
});
module.exports = __toCommonJS(parser_common_exports);
class ParserCommon {
  constructor(adapter) {
    this.messageId = "0";
    this.messageName = "unknown";
    this.ratelimitTimeout = null;
    this.adapter = adapter;
  }
  getVariableName(systemId, varname) {
    return `${this.adapter.name}.${this.adapter.instance.toString()}.${systemId.toString()}.${this.messageId}.${varname}`;
  }
  getMessageName() {
    return this.messageName;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParserCommon
});
//# sourceMappingURL=parser-common.js.map
