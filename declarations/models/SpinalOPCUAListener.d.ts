import { Model } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-model-graph';
import { IDataNodes } from '../interfaces/IDataNodes';
declare class SpinalOPCUAListener extends Model {
    constructor(graph: SpinalGraph, context: SpinalContext, organ: SpinalNode, network: SpinalNode, bmsDevice: SpinalNode, profile: SpinalNode, saveTimeSeries?: boolean);
    getAllData(): Promise<IDataNodes>;
    getGraph(): Promise<SpinalNode>;
    getOrgan(): Promise<SpinalNode>;
    getContext(): Promise<SpinalContext>;
    getBmsDevice(): Promise<SpinalNode>;
    getNetwork(): Promise<SpinalNode>;
    getProfile(): Promise<SpinalNode>;
    addToDevice(): Promise<void>;
    private _loadData;
}
export default SpinalOPCUAListener;
export { SpinalOPCUAListener };
