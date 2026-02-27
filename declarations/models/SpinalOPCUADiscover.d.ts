import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_USER_CHOICE } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { INetwork } from "../interfaces/INetwork";
import { SpinalDiscover } from "spinal-connector-service";
declare class SpinalOPCUADiscoverModel extends SpinalDiscover {
    constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, organ?: SpinalOrganOPCUA, network?: INetwork);
    changeChoice(choice: OPCUA_ORGAN_USER_CHOICE): void;
}
export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
