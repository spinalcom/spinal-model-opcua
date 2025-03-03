"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitModelReady = exports.getPathData = exports.convertToBase64 = exports._formatServer = exports._formatNetwork = void 0;
const axios_1 = require("axios");
function _formatNetwork(network) {
    network.gateways = network.gateways.map(el => _formatServer(el));
    return network;
}
exports._formatNetwork = _formatNetwork;
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
exports._formatServer = _formatServer;
function convertToBase64(tree) {
    return Buffer.from(JSON.stringify(tree)).toString("base64");
}
exports.convertToBase64 = convertToBase64;
function getPathData(dynamicId, hubUrl) {
    const path = hubUrl ? `${hubUrl}/sceen/_?u=${dynamicId}` : `/sceen/_?u=${dynamicId}`;
    return axios_1.default.get(path, { responseType: 'arraybuffer' }).then((response) => {
        // return Buffer.from(response.data);
        return Uint8Array.from(response.data);
    });
}
exports.getPathData = getPathData;
function waitModelReady(model) {
    return new Promise((resolve, reject) => {
        model.load((path) => {
            if (!path)
                return resolve(true);
            const delay = 3000;
            const intervalTime = 300;
            let time = 0;
            const wait = () => {
                setTimeout(() => {
                    const remaining = path.remaining.get();
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
exports.waitModelReady = waitModelReady;
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