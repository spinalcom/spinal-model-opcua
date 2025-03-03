import { Model } from "spinal-core-connectorjs_type";
import { SpinalNode } from "spinal-model-graph";
declare class SpinalOrganOPCUA extends Model {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    references: any;
    constructor(name?: string, type?: string);
    addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>>;
    isReferencedInContext(contextId: string): Promise<boolean>;
    removeReference(contextId: string): Promise<SpinalNode> | void;
}
export default SpinalOrganOPCUA;
export { SpinalOrganOPCUA };
