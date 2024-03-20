"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOPCUAPilot = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalOPCUAPilot extends spinal_core_connectorjs_type_1.Model {
    constructor(organ, request) {
        super();
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, ["init", "process", "success", "error"]),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            request: Array.isArray(request) ? new spinal_core_connectorjs_type_1.Lst(request) : new spinal_core_connectorjs_type_1.Lst([request])
        });
    }
    setNormalMode() {
        this.state.set("normal");
    }
    setProcessMode() {
        this.state.set("process");
    }
    setSuccessMode() {
        this.state.set("success");
    }
    setErrorMode() {
        this.state.set("error");
    }
    getOrgan() {
        return new Promise((resolve, reject) => {
            this.organ.load(value => resolve(value));
        });
    }
}
exports.SpinalOPCUAPilot = SpinalOPCUAPilot;
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAPilot]);
exports.default = SpinalOPCUAPilot;
//# sourceMappingURL=SpinalOPCUAPilot.js.map