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
exports.SpinalOPCUAEntryPoint = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const spinal_model_graph_1 = require("spinal-model-graph");
const utils_1 = require("../utils");
class SpinalOPCUAEntryPoint extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network) {
        super();
        if (!graph || !context || !organ || !network)
            return;
        this.add_attr({
            id: (0, uuid_1.v4)(),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            network: (0, utils_1._formatNetwork)(network),
            tree: ""
        });
    }
    getGraph() {
        return (0, utils_1.loadPtr)(this.graph).catch((error) => {
            return;
        });
    }
    getOrgan() {
        return (0, utils_1.loadPtr)(this.organ).then((organ) => __awaiter(this, void 0, void 0, function* () {
            if (organ instanceof spinal_model_graph_1.SpinalNode)
                organ = organ.getElement(true);
            return organ;
        })).catch((error) => {
            return;
        });
    }
    getContext() {
        return (0, utils_1.loadPtr)(this.context).catch((error) => {
            return;
        });
    }
    setTree(json) {
        const base64 = (0, utils_1.convertToBase64)(json);
        this.tree.set(base64);
    }
    getTree() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, utils_1.waitModelReady)(this.tree);
            const base64 = this.tree.get();
            const tree = Buffer.from(base64, "base64").toString("utf-8");
            if (tree.length === 0)
                return {};
            return JSON.parse(tree);
        });
    }
    addToGraph() {
        return this.getOrgan().then((organ) => __awaiter(this, void 0, void 0, function* () {
            if (!organ)
                return;
            if (!organ.entryPoints) {
                organ.add_attr({ entryPoints: new spinal_core_connectorjs_type_1.Ptr(new spinal_core_connectorjs_type_1.Lst([this])) });
                return organ;
            }
            const list = yield (0, utils_1.loadPtr)(organ.entryPoints);
            // check if already in list
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id.get() === this.id.get())
                    return element; // already in list
            }
            // not in list, add it
            list.push(this);
            return this;
        }));
    }
    removeFromGraph() {
        return __awaiter(this, void 0, void 0, function* () {
            const organ = yield (0, utils_1.loadPtr)(this.organ);
            if (!organ || !organ.entryPoints)
                return false;
            const list = yield (0, utils_1.loadPtr)(organ.entryPoints);
            if (!list)
                return false;
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id.get() === this.id.get()) {
                    list.remove(element);
                    return true;
                }
            }
            return false;
        });
    }
}
exports.SpinalOPCUAEntryPoint = SpinalOPCUAEntryPoint;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOPCUAEntryPoint]);
exports.default = SpinalOPCUAEntryPoint;
//# sourceMappingURL=SpinalOPCUAEntryPoint.js.map