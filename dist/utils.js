"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitModelReady = exports.convertToBase64 = exports._formatNetwork = void 0;
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
function waitModelReady(model) {
    return new Promise((resolve) => {
        let time = 0;
        const wait = () => {
            setTimeout(() => {
                const text = model.get();
                //@ts-ignore
                if ((text && text.length > 0) || time >= 2000) {
                    resolve(true);
                }
                else {
                    time += 300;
                    wait();
                }
            }, 300);
        };
        wait();
    });
}
exports.waitModelReady = waitModelReady;
//# sourceMappingURL=utils.js.map