export class Decoder {
    static async decode(image:string, readers: string[]): Promise<{"result": any|undefined, "readers": string[], "isFound": boolean, error: string|undefined}> {
        const re = {
            "result": undefined,
            "readers": readers,
            "isFound": false,
            "error": undefined
        }
        try {
            re.result = await new Promise((resolve, rejects) => {
                const Quagga = require('quagga').default;
                Quagga.decodeSingle({
                    src: image,
                    numOfWorkers: 0,
                    decoder: {
                        readers: readers
                    },
                }, function(result: any) {
                    if (result.codeResult) {
                        resolve(result);
                    } else {
                        rejects("Not found");
                    }
                });
            });
            re.isFound = true;
        } catch (ex) {
            re.error = ex;
            re.isFound = false;
        } finally {
            return re;
        }
    }
}
