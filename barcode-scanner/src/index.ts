"use strict"
import { router, get, post, AugmentedRequestHandler } from "microrouter";
import { IncomingMessage, ServerResponse } from "http";
import { send, buffer } from "micro";
import  * as statusCode from "http-status-codes";
import { Decoder } from "./decode";
import { fileSync } from "tmp";
import { writeFileSync } from "fs";

const decode_handler: AugmentedRequestHandler = async function (req: IncomingMessage, res: ServerResponse) {
    let result;
    let readers = req.headers.readers;
    if (typeof readers === "string") {
        readers = [readers];
    } else if (readers === undefined) {
        send(res, statusCode.BAD_REQUEST, "No header - reader - defined.");
        return;
    }
    const tempFilePath = fileSync({postfix:""+req.headers.name}).name;
    writeFileSync(tempFilePath, await buffer(req));
    result = await Decoder.decode(tempFilePath, readers);
    if (result.result) {
        result.result = result.result.codeResult.code;
    }
    send(res, statusCode.OK, result);
}

module.exports = router(
    post("/decode", decode_handler),
    get("/info", (req: IncomingMessage, res: ServerResponse) => send(res, statusCode.OK, "Test info")));