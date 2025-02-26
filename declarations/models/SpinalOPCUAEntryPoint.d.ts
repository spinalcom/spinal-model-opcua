import { Model } from "spinal-core-connectorjs_type";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { INetwork } from "../interfaces";
declare class SpinalOPCUAEntryPoint extends Model {
    graph: spinal.Pbr<SpinalGraph>;
    organ: spinal.Pbr<SpinalOrganOPCUA>;
    context: spinal.Pbr<SpinalContext>;
    servers: spinal.Lst<any>;
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork);
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalOrganOPCUA>;
    getContext(): Promise<SpinalContext>;
    setTree(json: any): void;
    getTree(): Promise<{
        [key: string]: any;
    }>;
    addToGraph(): Promise<SpinalOPCUAEntryPoint>;
    removeFromGraph(): Promise<boolean>;
}
export { SpinalOPCUAEntryPoint };
export default SpinalOPCUAEntryPoint;
