"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._formatNetwork = _formatNetwork;
exports._formatServer = _formatServer;
exports.convertToBase64 = convertToBase64;
exports.getPathData = getPathData;
exports.waitModelReady = waitModelReady;
exports.loadPtr = loadPtr;
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
function _formatNetwork(network) {
    network.gateways = network.gateways.map(el => _formatServer(el));
    return network;
}
function _formatServer(server) {
    let endpoint = (server === null || server === void 0 ? void 0 : server.endpoint) || "";
    if (endpoint.substring(0, 1) !== "/")
        endpoint = `/${endpoint}`;
    if (endpoint.substring(endpoint.length - 1) === "/")
        endpoint = endpoint.substring(0, endpoint.length - 1);
    if (!server)
        server = { endpoint: "" };
    server.endpoint = endpoint;
    return server;
}
function convertToBase64(tree) {
    return Buffer.from(JSON.stringify(tree)).toString("base64");
}
function getPathData(dynamicId, hubUrl = "") {
    const path = `${hubUrl}/sceen/_?u=${dynamicId}`;
    const client = axios_1.default.create({ baseURL: hubUrl });
    (0, axios_retry_1.default)(client, { retries: 3, retryDelay: axios_retry_1.default.exponentialDelay });
    return client.get(path, { responseType: 'arraybuffer' }).then((response) => {
        // return Buffer.from(response.data);
        return new Uint8Array(response.data);
    });
}
function waitModelReady(model) {
    return new Promise((resolve, reject) => {
        model.load((path) => {
            // if (!path) return resolve(true);
            const delay = 3000;
            const intervalTime = 300;
            let time = 0;
            const wait = () => {
                setTimeout(() => {
                    var _a;
                    const remaining = (_a = path === null || path === void 0 ? void 0 : path.remaining) === null || _a === void 0 ? void 0 : _a.get();
                    if (remaining == 0 || time >= delay) {
                        resolve(true);
                    }
                    else {
                        time += intervalTime;
                        wait();
                    }
                }, intervalTime);
            };
            wait();
        });
    });
}
function loadPtr(ptr) {
    return new Promise((resolve, reject) => {
        try {
            ptr.load((data) => resolve(data));
        }
        catch (error) {
            reject(error);
        }
    });
}
// export function waitModelReady(model: Str) {
// 	const delay = 3000;
// 	const intervalTime = 300;
// 	return new Promise((resolve) => {
// 		let time = 0;
// 		const wait = () => {
// 			setTimeout(() => {
// 				const text = model.get();
// 				//@ts-ignore
// 				if ((text && text.length > 0) || time >= delay) {
// 					resolve(true);
// 				} else {
// 					time += intervalTime;
// 					wait();
// 				}
// 			}, intervalTime);
// 		};
// 		wait();
// 	});
// }
//# sourceMappingURL=utils.js.map