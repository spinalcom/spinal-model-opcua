import { spinalCore, Model, Choice } from "spinal-core-connectorjs_type";
import { SpinalContext, SpinalGraph } from "spinal-model-graph";
import { OPCUA_ORGAN_USER_CHOICE } from "../constants";
import SpinalOrganOPCUA from "./SpinalOrganOPCUA";
import { _formatNetwork } from "../utils";
import { INetwork } from "../interfaces/INetwork";
import { SpinalDiscover } from "spinal-connector-service"

class SpinalOPCUADiscoverModel extends SpinalDiscover {

	constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, organ?: SpinalOrganOPCUA, network?: INetwork) {
		super(graph, context, organ);
		if (!graph || !context || !organ || !network) return;


		const askChoicesSet = new Set(Object.keys(OPCUA_ORGAN_USER_CHOICE));

		this.add_attr({
			network: _formatNetwork(network),
			useLastResult: false,
			ask: false,
			askResponse: new Choice(0, Array.from(askChoicesSet)),
			progress: new Model({ finished: 0, failed: 0, total: network.gateways.length }),
		});
	}

	public changeChoice(choice: OPCUA_ORGAN_USER_CHOICE) {
		const choicesSet = new Set(Object.keys(OPCUA_ORGAN_USER_CHOICE));
		this.askResponse.set(Array.from(choicesSet).indexOf(choice));
	}

}


spinalCore.register_models([SpinalOPCUADiscoverModel]);

export { SpinalOPCUADiscoverModel };
export default SpinalOPCUADiscoverModel;
