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
exports.ModelsInfo = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
class ModelsInfo extends spinal_core_connectorjs_1.Model {
    constructor() {
        super();
        this.add_attr({
            modification_date: Date.now(),
            length: 0,
            data: new spinal_core_connectorjs_1.Ptr(new spinal_core_connectorjs_1.Lst())
        });
    }
    addModel(discoverModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataList = yield this.getModels();
            dataList.push(discoverModel);
            this.length.set(dataList.length);
            return dataList.length;
        });
    }
    getModels() {
        return new Promise((resolve) => {
            this.data.load((discoverList) => resolve(discoverList));
        });
    }
    consumeModels() {
        return new Promise((resolve) => {
            this.data.load((discoverList) => {
                this.length.set(0);
                const arr = Array.from(discoverList);
                discoverList.clear();
                resolve(arr);
            });
        });
    }
    removeModel(discoverModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataList = yield this.getModels();
            const lengthBeforeRemove = dataList.length;
            dataList.remove(discoverModel);
            this.length.set(dataList.length);
            return this.length.get() < lengthBeforeRemove;
        });
    }
}
exports.default = ModelsInfo;
exports.ModelsInfo = ModelsInfo;
spinal_core_connectorjs_1.spinalCore.register_models([ModelsInfo]);
//# sourceMappingURL=modelsToBind.js.map