"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Decoder {
    static async decode(image, readers) {
        const re = {
            "result": undefined,
            "readers": readers,
            "isFound": false,
            "error": undefined
        };
        try {
            re.result = await new Promise((resolve, rejects) => {
                const Quagga = require('quagga').default;
                Quagga.decodeSingle({
                    src: image,
                    numOfWorkers: 0,
                    decoder: {
                        readers: readers
                    },
                }, function (result) {
                    if (result.codeResult) {
                        resolve(result);
                    }
                    else {
                        rejects("Not found");
                    }
                });
            });
            re.isFound = true;
        }
        catch (ex) {
            re.error = ex;
            re.isFound = false;
        }
        finally {
            return re;
        }
    }
}
exports.Decoder = Decoder;
//# sourceMappingURL=decode.js.map