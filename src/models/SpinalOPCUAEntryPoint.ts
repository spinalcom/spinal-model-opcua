import { spinalCore, Model, Lst, Choice, Str, Pbr, Ptr } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { INetwork } from "../interfaces";
import { _formatNetwork, convertToBase64, waitModelReady } from "../utils";


class SpinalOPCUAEntryPoint extends Model {
	graph: spinal.Pbr<SpinalGraph>;
	organ: spinal.Pbr<SpinalOrganOPCUA>;
	context: spinal.Pbr<SpinalContext>;
	servers: spinal.Lst<any>;

	constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork) {
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

	public addToGraph(): Promise<SpinalOPCUAEntryPoint> {
		return new Promise((resolve, reject) => {
			this.getOrgan().then((organ: SpinalOrganOPCUA) => {
				if (organ.entryPoints) {
					organ.entryPoints.load((list) => {
						for (let i = 0; i < list.length; i++) {
							const element = list[i];
							if (element.id.get() === this.id.get()) return resolve(element);
						}
						list.push(this);
						resolve(this);
					});
				} else {
					organ.add_attr({
						entryPoints: new Ptr(new Lst([this])),
					});

					resolve(this);
				}
			});
		});
	}

	public removeFromGraph(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.getOrgan().then((organ: SpinalOrganOPCUA) => {
				if (organ.entryPoints) {
					organ.entryPoints.load((list) => {
						for (let i = 0; i < list.length; i++) {
							const element = list[i];
							if (element.id.get() === this.id.get()) {
								list.splice(i, 1);
								return resolve(true);
							}
						}

						resolve(false);
					});
				} else {
					resolve(false);
				}
			});
		});
	}
}

//@ts-ignore
spinalCore.register_models([SpinalOPCUAEntryPoint]);

export { SpinalOPCUAEntryPoint };
export default SpinalOPCUAEntryPoint;