"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUADiscoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOPCUADiscoverModel extends spinal_connector_service_1.SpinalDiscover {
    constructor(graph, context, organ, network) {
        super(graph, context, organ);
        if (!graph || !context || !organ || !network)
            return;
        const askChoicesSet = new Set(Object.keys(constants_1.OPCUA_ORGAN_USER_CHOICE));
        this.add_attr({
            network: (0, utils_1._formatNetwork)(network),
            useLastResult: false,
            ask: false,
            askResponse: new spinal_core_connectorjs_type_1.Choice(0, Array.from(askChoicesSet)),
            progress: new spinal_core_connectorjs_type_1.Model({ finished: 0, failed: 0, total: network.gateways.length }),
        });
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