"use strict"
import { router, get, post, AugmentedRequestHandler } from "microrouter";
import { IncomingMessage, ServerResponse } from "http";
import { send, buffer } from "micro";
import  * as statusCode from "http-status-codes";
import { Decoder } from "./decode";

const decode_handler: AugmentedRequestHandler = async function (req: IncomingMessage, res: ServerResponse) {
    const data = JSON.parse(await buffer(req) as string);
    let result;
    let readers = data.readers;
    if (typeof readers === "string") {
        readers = [readers];
    } else if (readers === undefined) {
        readers = ["code_128_reader"];
    }
    result = await Decoder.decode(data.image, readers);
    if (result.result) {
        result.result = result.result.codeResult.code;
    }
    send(res, statusCode.OK, result);
}

module.exports = router(
    post("/decode", decode_handler),
    get("/info", (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        send(res, statusCode.OK, "Test info");
    }));