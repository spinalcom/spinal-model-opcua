import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-model-graph';
import { IDataNodes } from '../interfaces/IDataNodes';
import { SpinalListener } from "spinal-connector-service";
declare class SpinalOPCUAListener extends SpinalListener {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode, saveTimeSeries?: boolean);
    getAllData(): Promise<IDataNodes>;
}
export default SpinalOPCUAListener;
export { SpinalOPCUAListener };
