import { Model } from "spinal-core-connectorjs_type";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES, OPCUA_ORGAN_USER_CHOICE } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { INetwork } from "../interfaces/INetwork";
declare class SpinalOPCUADiscoverModel extends Model {
    graph: spinal.Pbr<SpinalGraph>;
    organ: spinal.Pbr<SpinalOrganOPCUA>;
    context: spinal.Pbr<SpinalContext>;
    servers: spinal.Lst<any>;
    constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, organ?: SpinalOrganOPCUA, network?: INetwork);
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalOrganOPCUA>;
    getContext(): Promise<SpinalContext>;
    setTreeDiscovered(json: any): Promise<void>;
    setTreeToCreate(json: any): Promise<void>;
    getTreeDiscovered(hubUrl?: string): Promise<any>;
    getTreeToCreate(hubUrl?: string): Promise<any>;
    addToGraph(): Promise<number>;
    removeFromGraph(): Promise<boolean>;
    changeState(state: OPCUA_ORGAN_STATES): void;
    changeChoice(choice: OPCUA_ORGAN_USER_CHOICE): void;
}
export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
