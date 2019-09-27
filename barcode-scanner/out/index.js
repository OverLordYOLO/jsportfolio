"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microrouter_1 = require("microrouter");
const micro_1 = require("micro");
const statusCode = __importStar(require("http-status-codes"));
const decode_1 = require("./decode");
const decode_handler = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    const data = JSON.parse(await micro_1.buffer(req));
    let result;
    let readers = data.readers;
    if (typeof readers === "string") {
        readers = [readers];
    }
    else if (readers === undefined) {
        readers = ["code_128_reader"];
    }
    result = await decode_1.Decoder.decode(data.image, readers);
    if (result.result && result.isFound) {
        result.result = result.result.codeResult.code;
    }
    micro_1.send(res, statusCode.OK, result);
};
module.exports = microrouter_1.router(microrouter_1.post("/decode", decode_handler), microrouter_1.get("/info", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    micro_1.send(res, statusCode.OK, "barcode-scanner service");
}));
//# sourceMappingURL=index.js.map