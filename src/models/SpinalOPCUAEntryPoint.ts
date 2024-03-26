import { spinalCore, Model, Lst, Choice, Str, Pbr } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { IServer } from "../interfaces/IServer";
import { _formatNetwork, convertToBase64, waitModelReady } from "../utils";


class SpinalOPCUAEntryPoint extends Model {
    graph: spinal.Pbr<SpinalGraph>;
	organ: spinal.Pbr<SpinalOrganOPCUA>;
	context: spinal.Pbr<SpinalContext>;
	servers: spinal.Lst<any>;

    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: IServer) {
        super();

        this.add_attr({
            id: uuidv4(),
            organ: new Pbr(organ),
            graph: new Pbr(graph),
            context: new Pbr(context),
            network: _formatNetwork(network),
            tree: ""
        });
    }

    public getGraph(): Promise<SpinalGraph> {
		return new Promise((resolve, reject) => {
			try {
				this.graph.load((data) => resolve(data));
			} catch (error) {
				reject(error);
			}
		});
	}

	public getOrgan(): Promise<SpinalOrganOPCUA> {
		return new Promise((resolve, reject) => {
			try {
				this.organ.load((data) => resolve(data));
			} catch (error) {
				reject(error);
			}
		});
	}

    public getContext(): Promise<SpinalContext> {
		return new Promise((resolve, reject) => {
			try {
				this.context.load((data) => resolve(data));
			} catch (error) {
				reject(error);
			}
		});
	}

    public setTree(json: any) {
		const base64 = convertToBase64(json);
		this.tree.set(base64);
	}

    public async getTree(): Promise<{ [key: string]: any }> {
		await waitModelReady(this.tree);

		const base64 = this.tree.get();
		const tree = Buffer.from(base64, "base64").toString("utf-8");

		if (tree.length === 0) return {};

		return JSON.parse(tree);
	}
}