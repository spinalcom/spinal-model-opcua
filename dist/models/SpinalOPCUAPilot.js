"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUAPilot = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOPCUAPilot extends spinal_connector_service_1.SpinalPilot {
    constructor(organ, request) {
        super(organ, request);
        if (!organ || !request)
            return;
    }
    setNormalMode() {
        this.setInitMode();
    }
}
exports.SpinalOPCUAPilot = SpinalOPCUAPilot;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAPilot]);
exports.default = SpinalOPCUAPilot;
//# sourceMappingURL=SpinalOPCUAPilot.js.map