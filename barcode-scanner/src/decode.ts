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
                    resolve(result);
                });
            });
        } catch (ex) {
            re.error = ex;
        } finally {
            re.isFound = re.result !== undefined;
            return re;
        }
    }
}
