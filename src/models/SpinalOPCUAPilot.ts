

import { spinalCore, Model, Ptr, Lst, Choice, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-model-graph';
import { v4 as uuidv4 } from "uuid";
import { IRequest } from '../interfaces';
import { SpinalPilot } from "spinal-connector-service";

class SpinalOPCUAPilot extends SpinalPilot<IRequest> {
    constructor(organ?: SpinalNode, request?: IRequest | IRequest[]) {
        super(organ, request);
        if (!organ || !request) return;

    }

    public setNormalMode() {
        this.setInitMode();
    }

}

spinalCore.register_models([SpinalOPCUAPilot])
export default SpinalOPCUAPilot;
export { SpinalOPCUAPilot };