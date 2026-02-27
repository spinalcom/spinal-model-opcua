"use strict";
/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalOrganOPCUA = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const constants_1 = require("../constants");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOrganOPCUA extends spinal_connector_service_1.SpinalOrganModel {
    constructor(name, type = constants_1.OPCUA_ORGAN_TYPE) {
        super(name, type);
        if (!name)
            return;
    }
}
exports.SpinalOrganOPCUA = SpinalOrganOPCUA;
SpinalOrganOPCUA.TYPE = constants_1.OPCUA_ORGAN_TYPE;
SpinalOrganOPCUA.CONTEXT_TO_ORGAN_RELATION = "hasBmsNetworkOrgan";
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOrganOPCUA]);
exports.default = SpinalOrganOPCUA;
//# sourceMappingURL=SpinalOrganOPCUA.js.map