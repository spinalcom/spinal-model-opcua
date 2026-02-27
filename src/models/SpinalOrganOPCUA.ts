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

import { spinalCore } from "spinal-core-connectorjs_type";
import { OPCUA_ORGAN_TYPE } from "../constants";
import { SpinalOrganModel } from "spinal-connector-service";
import SpinalOPCUADiscoverModel from "./SpinalOPCUADiscover";
import SpinalOPCUAPilot from "./SpinalOPCUAPilot";
import SpinalOPCUAListener from "./SpinalOPCUAListener";

class SpinalOrganOPCUA extends SpinalOrganModel<SpinalOPCUADiscoverModel, SpinalOPCUAPilot, SpinalOPCUAListener> {
	static TYPE: string = OPCUA_ORGAN_TYPE;
	static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";


	constructor(name?: string, type: string = OPCUA_ORGAN_TYPE) {
		super(name, type);
		if (!name) return;
	}

}

spinalCore.register_models([SpinalOrganOPCUA]);
export default SpinalOrganOPCUA;
export { SpinalOrganOPCUA };
