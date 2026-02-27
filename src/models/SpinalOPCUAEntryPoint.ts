import { spinalCore, Model, Lst, Choice, Str, Pbr, Ptr } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-model-graph";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { INetwork } from "../interfaces";
import { _formatNetwork, convertToBase64, loadPtr, waitModelReady } from "../utils";


class SpinalOPCUAEntryPoint extends Model {
	graph: spinal.Pbr<SpinalGraph>;
	organ: spinal.Pbr<SpinalOrganOPCUA>;
	context: spinal.Pbr<SpinalContext>;
	servers: spinal.Lst<any>;

	constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, organ?: SpinalOrganOPCUA, network?: INetwork) {
		super();

		if (!graph || !context || !organ || !network) return;

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
		return loadPtr(this.graph).catch((error) => {
			return;
		});
	}


	public getOrgan(): Promise<SpinalOrganOPCUA> {
		return loadPtr(this.organ).then(async (organ) => {
			if (organ instanceof SpinalNode) organ = organ.getElement(true);
			return organ;
		}).catch((error) => {
			return;
		});
	}

	public getContext(): Promise<SpinalContext> {
		return loadPtr(this.context).catch((error) => {
			return;
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

	public addToGraph(): Promise<SpinalOPCUAEntryPoint> {
		return this.getOrgan().then(async (organ: SpinalOrganOPCUA) => {
			if (!organ) return;
			if (!organ.entryPoints) {
				organ.add_attr({ entryPoints: new Ptr(new Lst([this])) });
				return organ;
			}

			const list = await loadPtr(organ.entryPoints);

			// check if already in list
			for (let i = 0; i < list.length; i++) {
				const element = list[i];
				if (element.id.get() === this.id.get()) return element; // already in list
			}

			// not in list, add it
			list.push(this);
			return this;
		});
	}

	public async removeFromGraph(): Promise<boolean> {
		const organ = await loadPtr(this.organ);
		if (!organ || !organ.entryPoints) return false;

		const list = await loadPtr(organ.entryPoints);
		if (!list) return false;

		for (let i = 0; i < list.length; i++) {
			const element = list[i];
			if (element.id.get() === this.id.get()) {
				list.remove(element);
				return true;
			}
		}

		return false;
	}
}


spinalCore.register_models([SpinalOPCUAEntryPoint]);

export { SpinalOPCUAEntryPoint };
export default SpinalOPCUAEntryPoint;