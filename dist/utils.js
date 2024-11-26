"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitModelReady = exports.getPathData = exports.convertToBase64 = exports._formatNetwork = void 0;
const axios_1 = require("axios");
function _formatNetwork(network) {
    let endpoint = (network === null || network === void 0 ? void 0 : network.endpoint) || "";
    if (endpoint.substring(0, 1) !== "/")
        endpoint = `/${endpoint}`;
    if (endpoint.substring(endpoint.length - 1) === "/")
        endpoint = endpoint.substring(0, endpoint.length - 1);
    if (!network)
        network = { endpoint: "" };
    network.endpoint = endpoint;
    return network;
}
exports._formatNetwork = _formatNetwork;
function convertToBase64(tree) {
    return Buffer.from(JSON.stringify(tree)).toString("base64");
}
exports.convertToBase64 = convertToBase64;
function getPathData(dynamicId, hubUrl) {
    const path = hubUrl ? `${hubUrl}/sceen/_?u=${dynamicId}` : `/sceen/_?u=${dynamicId}`;
    return axios_1.default.get(path).then((response) => {
        // return Buffer.from(response.data);
        return response.data;
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