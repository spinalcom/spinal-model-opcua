import { Model } from "spinal-core-connectorjs_type";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { IServer } from "../interfaces/IServer";
declare class SpinalOPCUADiscoverModel extends Model {
    graph: spinal.Ptr<SpinalGraph>;
    organ: spinal.Ptr<SpinalOrganOPCUA>;
    context: spinal.Ptr<SpinalContext>;
    servers: spinal.Lst<any>;
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: IServer);
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalOrganOPCUA>;
    getContext(): Promise<SpinalContext>;
    setTreeDiscovered(json: any): void;
    setTreeToCreate(json: any): void;
    addToGraph(): Promise<SpinalOPCUADiscoverModel>;
    removeFromGraph(): Promise<boolean>;
    changeState(state: OPCUA_ORGAN_STATES): void;
    getTreeDiscovered(): {
        [key: string]: any;
    };
    getTreeToCreate(): {
        [key: string]: any;
    };
    private convertToBase64;
}
export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
