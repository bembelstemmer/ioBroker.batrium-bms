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
var parser_base_data_exports = {};
__export(parser_base_data_exports, {
  ParserBaseData: () => ParserBaseData
});
module.exports = __toCommonJS(parser_base_data_exports);
var import_binary_parser = require("binary-parser");
class ParserBaseData {
  parser;
  constructor() {
    this.parser = new import_binary_parser.Parser().string("first", { encoding: "utf8", length: 1 }).int16le("MessageId", {
      formatter: (x) => {
        return x.toString(16);
      }
    }).string("nd", { encoding: "utf8", length: 1 }).int16le("SystemId").int16le("hubId");
  }
  parse(buf) {
    return this.parser.parse(buf);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParserBaseData
});
//# sourceMappingURL=parser-base-data.js.map
