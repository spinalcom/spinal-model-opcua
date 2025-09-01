import { spinalCore, Model, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-model-graph';
import { v4 as uuidv4 } from "uuid";
import { IDataNodes } from '../interfaces/IDataNodes';
import SpinalOrganOPCUA from './SpinalOrganOPCUA';

class SpinalOPCUAListener extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode, saveTimeSeries: boolean = false) {
        super();

        if (!graph || !context || !organ || !network) return;
        this.add_attr({
            id: uuidv4(),
            monitored: true,
            saveTimeSeries: saveTimeSeries,
            network: new Pbr(network),
            organ: new Pbr(organ),
            context: new Pbr(context),
            graph: new Pbr(graph),
            bmsDevice: new Pbr(bmsDevice),
            profile: new Pbr(profile),
        });
    }

    public getAllData(): Promise<IDataNodes> {

        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        return Promise.all(promises).then(([graph, organ, context, device, network, profile]) => {
            return {
                graph,
                organ,
                context,
                device,
                network,
                profile
            }
        })
    }

    public getGraph(): Promise<SpinalNode> {
        return this._loadData('graph');
    }

    public getOrgan(): Promise<SpinalNode> {
        return this._loadData('organ');
    }

    public getContext(): Promise<SpinalContext> {
        return this._loadData('context');
    }

    public getBmsDevice(): Promise<SpinalNode> {
        return this._loadData('bmsDevice');
    }

    public getNetwork(): Promise<SpinalNode> {
        return this._loadData('network');
    }

    public getProfile(): Promise<SpinalNode> {
        return this._loadData('profile');
    }

    public addToGraph(): Promise<number> {
        return this.getOrgan().then(async (organNode: SpinalNode) => {
            const organModel = await organNode.getElement(true);
            if (organModel) {
                await this.addToDevice(); // add reference to listener in device
                return organModel.addListenerModelToGraph(this); // add listener to organ listener list
            }
        })
    }

    public removeFromGraph(): Promise<boolean> {
        const promises = [this.getOrgan(), this.getBmsDevice()];

        return Promise.all(promises).then(async ([organNode, deviceNode]: SpinalNode[]) => {
            const organModel = await organNode.getElement(true);
            if (organModel) {
                deviceNode.info.remove_attr('listener'); // remove reference to listener in device
                return organModel.removeListenerModelFromGraph(this); // remove listener from organ listener list
            }
        })
    }

    public addToDevice() {
        return this.getBmsDevice().then((device) => {
            if (device.info.listeners) device.info.rem_attr('listener');

            device.info.add_attr({ listener: new Pbr(this) });
        });
    }


    private _loadData(dataName: string): Promise<SpinalNode> {
        return new Promise((resolve, reject) => {
            try {
                if (this[dataName] === undefined) throw new Error(`${dataName} not found`);

                this[dataName].load((data) => resolve(data));
            } catch (error) {
                reject(error);
            }
        });
    }
}

spinalCore.register_models([SpinalOPCUAListener])
export default SpinalOPCUAListener;
export { SpinalOPCUAListener }