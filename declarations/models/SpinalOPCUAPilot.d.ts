import { SpinalNode } from 'spinal-model-graph';
import { IRequest } from '../interfaces';
import { SpinalPilot } from "spinal-connector-service";
declare class SpinalOPCUAPilot extends SpinalPilot<IRequest> {
    constructor(organ?: SpinalNode, request?: IRequest | IRequest[]);
    setNormalMode(): void;
}
export default SpinalOPCUAPilot;
export { SpinalOPCUAPilot };
