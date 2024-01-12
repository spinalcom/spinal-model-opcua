"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUADiscoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
class SpinalOPCUADiscoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network, servers) {
        super();
        const choicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_STATES));
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, Array.from(choicesSet)),
            network,
            organ: new spinal_core_connectorjs_type_1.Ptr(organ),
            context: new spinal_core_connectorjs_type_1.Ptr(context),
            graph: new spinal_core_connectorjs_type_1.Ptr(graph),
            servers: new spinal_core_connectorjs_type_1.Lst(servers),
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
    getServers() {
        return this.servers;
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
}
exports.SpinalOPCUADiscoverModel = SpinalOPCUADiscoverModel;
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUADiscoverModel]);
exports.default = SpinalOPCUADiscoverModel;
//# sourceMappingURL=SpinalOPCUADiscover.js.map