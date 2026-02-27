import { SpinalOrganModel } from "spinal-connector-service";
import SpinalOPCUADiscoverModel from "./SpinalOPCUADiscover";
import SpinalOPCUAPilot from "./SpinalOPCUAPilot";
import SpinalOPCUAListener from "./SpinalOPCUAListener";
declare class SpinalOrganOPCUA extends SpinalOrganModel<SpinalOPCUADiscoverModel, SpinalOPCUAPilot, SpinalOPCUAListener> {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    constructor(name?: string, type?: string);
}
export default SpinalOrganOPCUA;
export { SpinalOrganOPCUA };
