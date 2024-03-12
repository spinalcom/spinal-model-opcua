"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUAListener = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalOPCUAListener extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network, bmsDevice, profile) {
        super();
        this.add_attr({
            id: (0, uuid_1.v4)(),
            monitored: true,
            network: new spinal_core_connectorjs_type_1.Pbr(network),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            bmsDevice: new spinal_core_connectorjs_type_1.Pbr(bmsDevice),
            profile: new spinal_core_connectorjs_type_1.Pbr(profile),
        });
    }
    getAllData() {
        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises).then(([graph, organ, context, device, network, profile]) => {
            return {
                graph,
                organ,
                context,
                device,
                network,
                profile
            };
        });
    }
    getGraph() {
        return this._loadData('graph');
    }
    getOrgan() {
        return this._loadData('organ');
    }
    getContext() {
        return this._loadData('context');
    }
    getBmsDevice() {
        return this._loadData('bmsDevice');
    }
    getNetwork() {
        return this._loadData('network');
    }
    getProfile() {
        return this._loadData('profile');
    }
    _loadData(dataName) {
        return new Promise((resolve, reject) => {
            try {
                if (this[dataName] === undefined)
                    throw new Error(`${dataName} not found`);
                this[dataName].load((data) => resolve(data));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.SpinalOPCUAListener = SpinalOPCUAListener;
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAListener]);
exports.default = SpinalOPCUAListener;
//# sourceMappingURL=SpinalOPCUAListener.js.map