"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUADiscoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
class SpinalOPCUADiscoverModel extends spinal_core_connectorjs_type_1.Model {
    // constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork, servers: IServer[]) {
    constructor(graph, context, organ, network) {
        super();
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_STATES));
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, Array.from(choicesSet)),
            network,
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
        const tree = this.treeDiscovered.get();
        if (tree.length === 0)
            return {};
        return JSON.parse(tree);
    }
    getTreeToCreate() {
        const tree = this.treeToCreate.get();
        if (tree.length === 0)
            return {};
        return JSON.parse(tree);
    }
}
exports.SpinalOPCUADiscoverModel = SpinalOPCUADiscoverModel;
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUADiscoverModel]);
exports.default = SpinalOPCUADiscoverModel;
//# sourceMappingURL=SpinalOPCUADiscover.js.map