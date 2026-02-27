"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUAListener = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOPCUAListener extends spinal_connector_service_1.SpinalListener {
    constructor(graph, context, organ, network, bmsDevice, profile, saveTimeSeries = false) {
        super(graph, context, organ, network, bmsDevice, profile);
        if (!graph || !context || !organ || !network)
            return;
        this.add_attr({
            saveTimeSeries: saveTimeSeries,
        });
    }
    getAllData() {
        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises).then(([graph, organ, context, device, network, profile]) => {
            return { graph, organ, context, device, network, profile };
        });
    }
}
exports.SpinalOPCUAListener = SpinalOPCUAListener;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAListener]);
exports.default = SpinalOPCUAListener;
//# sourceMappingURL=SpinalOPCUAListener.js.map