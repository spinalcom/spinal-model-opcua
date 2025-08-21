import { Model } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-model-graph';
import { IRequest } from '../interfaces';
declare class SpinalOPCUAPilot extends Model {
    constructor(organ?: SpinalNode, request?: IRequest | IRequest[]);
    setNormalMode(): void;
    setProcessMode(): void;
    setSuccessMode(): void;
    setErrorMode(): void;
    getOrgan(): Promise<SpinalNode>;
    addToGraph(): Promise<number>;
    removeFromGraph(): Promise<boolean>;
    addToNode(endpoint: SpinalNode<any>): Promise<any>;
    removeFromNode(): Promise<any>;
}
export default SpinalOPCUAPilot;
export { SpinalOPCUAPilot };
