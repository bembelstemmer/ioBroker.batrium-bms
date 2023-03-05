"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var utils = __toESM(require("@iobroker/adapter-core"));
var import_node_dgram = __toESM(require("node:dgram"));
var import_parser_facade = require("./lib/parsers/parser-facade");
class BatriumBms extends utils.Adapter {
  constructor(options = {}) {
    super({
      ...options,
      name: "batrium-bms"
    });
    this.on("ready", this.onReady.bind(this));
    this.on("unload", this.onUnload.bind(this));
    this.server = import_node_dgram.default.createSocket({ type: "udp4" });
    this.parserFacade = new import_parser_facade.ParserFacade(this);
  }
  async onReady() {
    this.setState("info.connection", false, true);
    this.server.on("error", this.onServerError.bind(this));
    this.server.on("listening", this.onServerListening.bind(this));
    this.server.on("message", this.onServerMessage.bind(this));
    this.server.on("close", this.onServerClose.bind(this));
    this.server.bind(parseInt(this.config.bindingport), this.config.bindingaddress);
  }
  onUnload(callback) {
    try {
      this.server.close();
      callback();
    } catch (e) {
      callback();
    }
  }
  async onServerMessage(msg, info) {
    const data = await this.parserFacade.getMessageBaseData(msg);
    this.log.silly(`MSG received from ${info.address} MessageID:${data.MessageId} SystemID:${data.SystemId}`);
    this.parserFacade.handleMessage(data.SystemId, data.MessageId, msg);
  }
  async onServerListening() {
    const address = this.server.address();
    const port = address.port;
    const ipaddr = address.address;
    this.log.info(`UDP Listening started on ${ipaddr}:${port}`);
    this.setState("info.connection", true, true);
  }
  async onServerClose() {
    this.log.info("UDP Listener Port closed.");
  }
  onServerError(error) {
    this.log.error("Error in listener: " + error.message);
    this.setState("info.connection", false, true);
    this.restart();
  }
}
if (require.main !== module) {
  module.exports = (options) => new BatriumBms(options);
} else {
  (() => new BatriumBms())();
}
//# sourceMappingURL=main.js.map
