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
const utils_1 = require("../utils");
const gzip = require("node-gzip");
class SpinalOPCUADiscoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network) {
        super();
        if (!graph || !context || !organ || !network)
            return;
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_STATES));
        const askChoicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_USER_CHOICE));
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, Array.from(choicesSet)),
            network: (0, utils_1._formatNetwork)(network),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            treeDiscovered: new spinal_core_connectorjs_type_1.Ptr(),
            treeToCreate: new spinal_core_connectorjs_type_1.Ptr(),
            // servers: new Lst(servers),
            creation: Date.now(),
            ask: false,
            askResponse: new spinal_core_connectorjs_type_1.Choice(0, Array.from(askChoicesSet)),
            progress: new spinal_core_connectorjs_type_1.Model({ finished: 0, total: network.gateways.length })
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
    /*
        ///////////////////////////////////////////////////
        //             use base64
        ///////////////////////////////////////////////////
        public setTreeDiscovered(json: any) {
            const base64 = convertToBase64(json);
            this.treeDiscovered.set(base64);
        }

        public setTreeToCreate(json: any) {
            const base64 = convertToBase64(json);
            this.treeToCreate.set(base64);
        }
        
        public async getTreeDiscovered(): Promise<{ [key: string]: any }> {
            await waitModelReady(this.treeDiscovered);

            const base64 = this.treeDiscovered.get();
            const tree = Buffer.from(base64, "base64").toString("utf-8");

            if (tree.length === 0) return {};

            return JSON.parse(tree);
        }

        public async getTreeToCreate(): Promise<{ [key: string]: any }> {
            await waitModelReady(this.treeToCreate);

            const base64 = this.treeToCreate.get();
            const tree = Buffer.from(base64, "base64").toString("utf-8");

            if (tree.length === 0) return {};

            return JSON.parse(tree);
        }
    */
    setTreeDiscovered(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // // const compressed = await gzip(JSON.stringify(json));
            // const compressed = Buffer.from(JSON.stringify(json));
            // const path = new Path(compressed);
            // // this.treeDiscovered.set(path); // le .set ne fonctionnait pas sur le browser
            // this.mod_attr("treeDiscovered", new Ptr(path));
            const compressed = yield gzip.gzip(JSON.stringify(json));
            const path = new spinal_core_connectorjs_type_1.Path(compressed);
            this.mod_attr("treeDiscovered", new spinal_core_connectorjs_type_1.Ptr(path));
        });
    }
    setTreeToCreate(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // // const compressed = await gzip(JSON.stringify(json));
            // const compressed = Buffer.from(JSON.stringify(json));
            // const path = new Path(compressed);
            // // this.treeToCreate.set(path); // le .set ne fonctionnait pas sur le browser
            // this.mod_attr("treeToCreate", new Ptr(path));
            const compressed = yield gzip.gzip(JSON.stringify(json));
            const path = new spinal_core_connectorjs_type_1.Path(compressed);
            this.mod_attr("treeToCreate", new spinal_core_connectorjs_type_1.Ptr(path));
        });
    }
    getTreeDiscovered(hubUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, utils_1.waitModelReady)(this.treeDiscovered);
            // // const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
            // // return pathData;
            // // // const tree = await ungzip(pathData);
            // // // return JSON.parse(tree.toString());
            // const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
            // const tree = await gzip.ungzip(pathData);
            // return JSON.parse(tree.toString());
            const pathData = yield (0, utils_1.getPathData)(this.treeDiscovered.data.value, hubUrl);
            const decompressed = yield gzip.ungzip(pathData);
            return JSON.parse(decompressed.toString());
        });
    }
    getTreeToCreate(hubUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // await waitModelReady(this.treeToCreate);
            // const pathData = await getPathData(this.treeToCreate.data.value, hubUrl);
            // return pathData;
            // // const tree = await ungzip(pathData);
            // // return JSON.parse(tree.toString());
            const pathData = yield (0, utils_1.getPathData)(this.treeToCreate.data.value, hubUrl);
            const decompressed = yield gzip.ungzip(pathData);
            return JSON.parse(decompressed.toString());
        });
    }
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
    changeChoice(choice) {
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_USER_CHOICE));
        this.askResponse.set(Array.from(choicesSet).indexOf(choice));
    }
}
exports.SpinalOPCUADiscoverModel = SpinalOPCUADiscoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUADiscoverModel]);
exports.default = SpinalOPCUADiscoverModel;
//# sourceMappingURL=SpinalOPCUADiscover.js.map