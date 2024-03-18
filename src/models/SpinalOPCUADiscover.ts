import { spinalCore, Model, Ptr, Lst, Choice, Str } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { IServer } from "../interfaces/IServer";
import * as zlib from "zlib";


function _formatNetwork(network: IServer): IServer {
	let endpoint = network.endpoint || "";

	if(endpoint.substring(0,1) !== "/") endpoint = `/${endpoint}`;
	if(endpoint.substring(endpoint.length - 1) === "/") endpoint = endpoint.substring(0, endpoint.length - 1);

	network.endpoint = endpoint;
	return network;
}

class SpinalOPCUADiscoverModel extends Model {
	graph: spinal.Ptr<SpinalGraph>;
	organ: spinal.Ptr<SpinalOrganOPCUA>;
	context: spinal.Ptr<SpinalContext>;
	servers: spinal.Lst<any>;

	// constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: INetwork, servers: IServer[]) {
	constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganOPCUA, network: IServer) {
		super();

		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_STATES));

		this.add_attr({
			id: uuidv4(),
			state: new Choice(0, Array.from(choicesSet)),
			network: _formatNetwork(network),
			organ: new Ptr(organ),
			context: new Ptr(context),
			graph: new Ptr(graph),
			treeDiscovered: "",
			treeToCreate: "",
			// servers: new Lst(servers),
			creation: Date.now(),
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
		const base64 = this.convertToBase64(json);
		this.treeDiscovered.set(base64);
	}

	public setTreeToCreate(json: any) {
		const base64 = this.convertToBase64(json);
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
		await this.waitModelReady(this.treeDiscovered);

		const base64 = this.treeDiscovered.get();
		const tree = Buffer.from(base64, "base64").toString("utf-8");

		if (tree.length === 0) return {};

		return JSON.parse(tree);
	}

	public async getTreeToCreate(): Promise<{ [key: string]: any }> {
		await this.waitModelReady(this.treeToCreate);

		const base64 = this.treeToCreate.get();
		const tree = Buffer.from(base64, "base64").toString("utf-8");

		if (tree.length === 0) return {};

		return JSON.parse(tree);
	}

	private convertToBase64(tree: any): string {
		return Buffer.from(JSON.stringify(tree)).toString("base64");

		// return new Promise((resolve, reject) => {
		// 	const treeString = JSON.stringify(tree);
		// 	zlib.deflate(treeString, (err, buffer) => {
		// 		if (!err) {
		// 			const base64 = buffer.toString("base64");
		// 			return resolve(base64);
		// 		}

		// 		return reject();
		// 	});
		// });
	}

	private waitModelReady(model: Str) {
		return new Promise((resolve) => {
			let time = 0;
			const wait = () => {
				setTimeout(() => {
					const text = model.get();
					//@ts-ignore
					if ((text && text.length > 0) || time >= 2000) {
						resolve(true);
					} else {
						time += 300;
						wait();
					}
				}, 300);
			};
			wait();
		});
	}
}

//@ts-ignore
spinalCore.register_models([SpinalOPCUADiscoverModel]);

export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
