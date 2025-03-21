import { spinalCore, Model, Ptr, Lst, Choice, Str, Pbr, Path } from "spinal-core-connectorjs_type";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_STATES, OPCUA_ORGAN_USER_CHOICE } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { _formatNetwork, getPathData, waitModelReady } from "../utils";
import { INetwork } from "../interfaces/INetwork";
import * as gzip from "node-gzip"


class SpinalOPCUADiscoverModel extends Model {
	graph: spinal.Pbr<SpinalGraph>;
	organ: spinal.Pbr<SpinalOrganOPCUA>;
	context: spinal.Pbr<SpinalContext>;
	servers: spinal.Lst<any>;

	constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, organ?: SpinalOrganOPCUA, network?: INetwork) {
		super();

		if (!graph || !context || !organ || !network) return;

		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_STATES));
		const askChoicesSet = new Set(Object.keys(OPCUA_ORGAN_USER_CHOICE));

		this.add_attr({
			id: uuidv4(),
			state: new Choice(0, Array.from(choicesSet)),
			network: _formatNetwork(network),
			organ: new Pbr(organ),
			context: new Pbr(context),
			graph: new Pbr(graph),
			treeDiscovered: new Ptr(),
			treeToCreate: new Ptr(),
			// servers: new Lst(servers),
			creation: Date.now(),
			ask: false,
			askResponse: new Choice(0, Array.from(askChoicesSet)),
			progress: new Model({ finished: 0, failed: 0, total: network.gateways.length }),
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


	public async setTreeDiscovered(json: any) {
		// // const compressed = await gzip(JSON.stringify(json));
		// const compressed = Buffer.from(JSON.stringify(json));
		// const path = new Path(compressed);
		// // this.treeDiscovered.set(path); // le .set ne fonctionnait pas sur le browser
		// this.mod_attr("treeDiscovered", new Ptr(path));

		const compressed = await gzip.gzip(JSON.stringify(json));
		const path = new Path(compressed);
		this.mod_attr("treeDiscovered", new Ptr(path));

	}

	public async setTreeToCreate(json: any) {
		// // const compressed = await gzip(JSON.stringify(json));
		// const compressed = Buffer.from(JSON.stringify(json));
		// const path = new Path(compressed);
		// // this.treeToCreate.set(path); // le .set ne fonctionnait pas sur le browser
		// this.mod_attr("treeToCreate", new Ptr(path));

		const compressed = await gzip.gzip(JSON.stringify(json));
		const path = new Path(compressed);
		this.mod_attr("treeToCreate", new Ptr(path));
	}

	public async getTreeDiscovered(hubUrl?: string) {
		await waitModelReady(this.treeDiscovered);
		// // const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
		// // return pathData;
		// // // const tree = await ungzip(pathData);
		// // // return JSON.parse(tree.toString());

		// const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
		// const tree = await gzip.ungzip(pathData);

		// return JSON.parse(tree.toString());

		const pathData = await getPathData(this.treeDiscovered.data.value, hubUrl);
		const decompressed = await gzip.ungzip(pathData);
		return JSON.parse(decompressed.toString());
	}


	public async getTreeToCreate(hubUrl?: string) {
		await waitModelReady(this.treeToCreate);
		// const pathData = await getPathData(this.treeToCreate.data.value, hubUrl);
		// return pathData;
		// // const tree = await ungzip(pathData);
		// // return JSON.parse(tree.toString());

		const pathData = await getPathData(this.treeToCreate.data.value, hubUrl);
		const decompressed = await gzip.ungzip(pathData);
		return JSON.parse(decompressed.toString());

	}


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

	public changeChoice(choice: OPCUA_ORGAN_USER_CHOICE) {
		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_USER_CHOICE));
		this.askResponse.set(Array.from(choicesSet).indexOf(choice));
	}

}


spinalCore.register_models([SpinalOPCUADiscoverModel]);

export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
