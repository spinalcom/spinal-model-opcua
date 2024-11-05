import { spinalCore, Model, Ptr, Lst, Choice, Str, Pbr } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES, OPCUA_ORGAN_USER_CHOICE } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { IServer } from "../interfaces/IServer";
import { _formatNetwork, convertToBase64, waitModelReady } from "../utils";



class SpinalOPCUADiscoverModel extends Model {
	graph: spinal.Pbr<SpinalGraph>;
	organ: spinal.Pbr<SpinalOrganOPCUA>;
	context: spinal.Pbr<SpinalContext>;
	servers: spinal.Lst<any>;

	// constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork, servers: IServer[]) {
	constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: IServer) {
		super();

		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_STATES));
		const askChoicesSet = new Set(Object.keys(OPCUA_ORGAN_USER_CHOICE));

		this.add_attr({
			id: uuidv4(),
			state: new Choice(0, Array.from(choicesSet)),
			network: _formatNetwork(network),
			organ: new Pbr(organ),
			context: new Pbr(context),
			graph: new Pbr(graph),
			treeDiscovered: "",
			treeToCreate: "",
			// servers: new Lst(servers),
			creation: Date.now(),
			ask: false,
			askResponse: new Choice(0, Array.from(askChoicesSet))
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

	public setTreeDiscovered(json: any) {
		const base64 = convertToBase64(json);
		this.treeDiscovered.set(base64);
	}

	public setTreeToCreate(json: any) {
		const base64 = convertToBase64(json);
		this.treeToCreate.set(base64);
	}

	// public getServers(): spinal.Lst {
	// 	return this.servers;
	// }

	public addToGraph(): Promise<SpinalOPCUADiscoverModel> {
		return new Promise((resolve, reject) => {
			this.getOrgan().then((organ: SpinalOrganOPCUA) => {
				if (organ.discover) {
					organ.discover.load((list) => {
						for (let i = 0; i < list.length; i++) {
							const element = list[i];
							if (element.id.get() === this.id.get()) return resolve(element);
						}
						list.push(this);
						resolve(this);
					});
				} else {
					organ.add_attr({
						discover: new Ptr(new Lst([this])),
					});

					resolve(this);
				}
			});
		});
	}

	public removeFromGraph(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.getOrgan().then((organ: SpinalOrganOPCUA) => {
				if (organ.discover) {
					organ.discover.load((list) => {
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

	public changeState(state: OPCUA_ORGAN_STATES) {
		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_STATES));

		this.state.set(Array.from(choicesSet).indexOf(state));
	}

	public async getTreeDiscovered(): Promise<{ [key: string]: any }> {
		await waitModelReady(this.treeDiscovered);

		const base64 = this.treeDiscovered.get();
		const tree = Buffer.from(base64, "base64").toString("utf-8");

		if (tree.length === 0) return {};

		return JSON.parse(tree);
	}

	public async getTreeToCreate(): Promise<{ [key: string]: any }> {
		await waitModelReady(this.treeToCreate);

		const base64 = this.treeToCreate.get();
		const tree = Buffer.from(base64, "base64").toString("utf-8");

		if (tree.length === 0) return {};

		return JSON.parse(tree);
	}



}

//@ts-ignore
spinalCore.register_models([SpinalOPCUADiscoverModel]);

export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
