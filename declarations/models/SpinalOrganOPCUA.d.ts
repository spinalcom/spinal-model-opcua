import { Model, Lst } from "spinal-core-connectorjs_type";
import { SpinalNode } from "spinal-model-graph";
import SpinalOPCUADiscoverModel from "./SpinalOPCUADiscover";
import ModelsInfo from "./modelsToBind";
import SpinalOPCUAPilot from "./SpinalOPCUAPilot";
import SpinalOPCUAListener from "./SpinalOPCUAListener";
declare class SpinalOrganOPCUA extends Model {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    references: any;
    constructor(name?: string, type?: string);
    private _initializeModelsList;
    getModels(): {
        discover: ModelsInfo<SpinalOPCUADiscoverModel>;
        pilot: ModelsInfo<SpinalOPCUAPilot>;
        listener: ModelsInfo<SpinalOPCUAListener>;
    };
    addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>>;
    isReferencedInContext(contextId: string): Promise<boolean>;
    removeReference(contextId: string): Promise<SpinalNode> | void;
    addDiscoverModelToGraph(discoverModel: SpinalOPCUADiscoverModel): Promise<number>;
    addPilotModelToGraph(discoverModel: SpinalOPCUAPilot): Promise<number>;
    addListenerModelToGraph(discoverModel: SpinalOPCUAListener): Promise<number>;
    removeDiscoverModelFromGraph(discoverModel: SpinalOPCUADiscoverModel): Promise<boolean>;
    removePilotModelFromGraph(discoverModel: SpinalOPCUAPilot): Promise<boolean>;
    removeListenerModelFromGraph(discoverModel: SpinalOPCUAListener): Promise<boolean>;
    getDiscoverModelFromGraph(): Promise<Lst<SpinalOPCUADiscoverModel>>;
    getPilotModelFromGraph(): Promise<Lst<SpinalOPCUAPilot>>;
    getListenerModelFromGraph(): Promise<Lst<SpinalOPCUAListener>>;
    consumeDiscoverModelFromGraph(): Promise<SpinalOPCUADiscoverModel[]>;
    consumePilotModelFromGraph(): Promise<SpinalOPCUAPilot[]>;
    consumeListenerModelFromGraph(): Promise<SpinalOPCUAListener[]>;
}
export default SpinalOrganOPCUA;
export { SpinalOrganOPCUA };
