import { Str } from "spinal-core-connectorjs_type";
import { IServer } from "./interfaces/IServer";


export function _formatNetwork(network: IServer): IServer {
	let endpoint = network?.endpoint || "";

	if(endpoint.substring(0,1) !== "/") endpoint = `/${endpoint}`;
	if(endpoint.substring(endpoint.length - 1) === "/") endpoint = endpoint.substring(0, endpoint.length - 1);

	if(!network) network = { endpoint: "" } as any;
	
	network.endpoint = endpoint;
	return network;
}

export function convertToBase64(tree: any): string {
	return Buffer.from(JSON.stringify(tree)).toString("base64");
}


export function waitModelReady(model: Str) {
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