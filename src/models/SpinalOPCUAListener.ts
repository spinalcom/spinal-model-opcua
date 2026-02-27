import { spinalCore, Model, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-model-graph';
import { v4 as uuidv4 } from "uuid";
import { IDataNodes } from '../interfaces/IDataNodes';
import { SpinalListener } from "spinal-connector-service"

class SpinalOPCUAListener extends SpinalListener {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode, saveTimeSeries: boolean = false) {
        super(graph, context, organ, network, bmsDevice, profile);

        if (!graph || !context || !organ || !network) return;
        this.add_attr({
            saveTimeSeries: saveTimeSeries,
        });
    }

    public getAllData(): Promise<IDataNodes> {

        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises).then(([graph, organ, context, device, network, profile]) => {
            return { graph, organ, context, device, network, profile }
        })
    }
}

spinalCore.register_models([SpinalOPCUAListener])
export default SpinalOPCUAListener;
export { SpinalOPCUAListener }