"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUADiscoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
function _formatNetwork(network) {
    let endpoint = network.endpoint;
    if (endpoint && endpoint.length > 0) {
        if (endpoint.substring(0, 1) === "/")
            endpoint = endpoint.substring(1);
        if (endpoint.substring(endpoint.length - 1) === "/")
            endpoint = endpoint.substring(0, endpoint.length - 1);
    }
    network.endpoint = endpoint;
    return network;
}
class SpinalOPCUADiscoverModel extends spinal_core_connectorjs_type_1.Model {
    // constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork, servers: IServer[]) {
    constructor(graph, context, organ, network) {
        super();
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_STATES));
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, Array.from(choicesSet)),
            network: _formatNetwork(network),
            organ: new spinal_core_connectorjs_type_1.Ptr(organ),
            context: new spinal_core_connectorjs_type_1.Ptr(context),
            graph: new spinal_core_connectorjs_type_1.Ptr(graph),
            treeDiscovered: "",
            treeToCreate: "",
            // servers: new Lst(servers),
            creation: Date.now(),
        });
    }
    getGraph() {
        return new Promise((resolve, reject) => {
            try {
                this.graph.load((data) => resolve(data));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getOrgan() {
        return new Promise((resolve, reject) => {
            try {
                this.organ.load((data) => resolve(data));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getContext() {
        return new Promise((resolve, reject) => {
            try {
                this.context.load((data) => resolve(data));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    setTreeDiscovered(json) {
        const base64 = this.convertToBase64(json);
        this.treeDiscovered.set(base64);
    }
    setTreeToCreate(json) {
        const base64 = this.convertToBase64(json);
        this.treeToCreate.set(base64);
    }
    // public getServers(): spinal.Lst {
    // 	return this.servers;
    // }
    addToGraph() {
        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ) => {
                if (organ.discover) {
                    organ.discover.load((list) => {
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            if (element.id.get() === this.id.get())
                                return resolve(element);
                        }
                        list.push(this);
                        resolve(this);
                    });
                }
                else {
                    organ.add_attr({
                        discover: new spinal_core_connectorjs_type_1.Ptr(new spinal_core_connectorjs_type_1.Lst([this])),
                    });
                    resolve(this);
                }
            });
        });
    }
    removeFromGraph() {
        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ) => {
                if (organ.discover) {
                    organ.discover.load((list) => {
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            if (element.id.get() === this.id.get()) {
                                list.splice(i, 1);
                                return resolve(true);
                            }
                        }
                        resolve(false);
                    });
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    changeState(state) {
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_STATES));
        this.state.set(Array.from(choicesSet).indexOf(state));
    }
    getTreeDiscovered() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitModelReady(this.treeDiscovered);
            const base64 = this.treeDiscovered.get();
            const tree = Buffer.from(base64, "base64").toString("utf-8");
            if (tree.length === 0)
                return {};
            return JSON.parse(tree);
        });
    }
    getTreeToCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitModelReady(this.treeToCreate);
            const base64 = this.treeToCreate.get();
            const tree = Buffer.from(base64, "base64").toString("utf-8");
            if (tree.length === 0)
                return {};
            return JSON.parse(tree);
        });
    }
    convertToBase64(tree) {
        return Buffer.from(JSON.stringify(tree)).toString("base64");
        // return new Promise((resolve, reject) => {
        // 	const treeString = JSON.stringify(tree);
        // 	zlib.deflate(treeString, (err, buffer) => {
        // 		if (!err) {
        // 			const base64 = buffer.toString("base64");
        // 			return resolve(base64);
        // 		}
        // 		return reject();
        // 	});
        // });
    }
    waitModelReady(model) {
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
}
exports.SpinalOPCUADiscoverModel = SpinalOPCUADiscoverModel;
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUADiscoverModel]);
exports.default = SpinalOPCUADiscoverModel;
//# sourceMappingURL=SpinalOPCUADiscover.js.map