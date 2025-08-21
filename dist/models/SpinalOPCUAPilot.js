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
exports.SpinalOPCUAPilot = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalOPCUAPilot extends spinal_core_connectorjs_type_1.Model {
    constructor(organ, request) {
        super();
        if (!organ || !request)
            return;
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
    addToGraph() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organModel = yield organNode.getElement(true);
            if (organModel) {
                return organModel.addPilotToGraph(this);
            }
        }));
    }
    removeFromGraph() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organModel = yield organNode.getElement(true);
            if (organModel) {
                return organModel.removePilotModelFromGraph(this);
            }
        }));
    }
    addToNode(endpoint) {
        return new Promise((resolve) => {
            if (!endpoint.info.pilot) {
                const model = new spinal_core_connectorjs_type_1.Lst();
                model.push(this);
                endpoint.info.add_attr({ pilot: new spinal_core_connectorjs_type_1.Ptr(model) });
                resolve(model);
            }
            else {
                endpoint.info.pilot.load(lst => {
                    lst.push(this);
                    resolve(lst);
                });
            }
        }).then((res) => {
            this.add_attr({ node: endpoint });
            return res;
        });
    }
    removeFromNode() {
        return new Promise((resolve, reject) => {
            if (this.node) {
                this.node.info.pilot.load(lst => {
                    for (let i = 0; i < lst.length; i++) {
                        const element = lst[i];
                        if (element.id.get() === this.id.get()) {
                            lst.splice(i);
                            break;
                        }
                    }
                    resolve(true);
                });
            }
            else {
                resolve(false);
            }
        });
    }
}
exports.SpinalOPCUAPilot = SpinalOPCUAPilot;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAPilot]);
exports.default = SpinalOPCUAPilot;
//# sourceMappingURL=SpinalOPCUAPilot.js.map