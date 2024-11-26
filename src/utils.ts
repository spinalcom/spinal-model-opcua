import { Ptr, Str } from "spinal-core-connectorjs_type";
import { IServer } from "./interfaces/IServer";
import axios from "axios";

export function _formatNetwork(network: IServer): IServer {
	let endpoint = network?.endpoint || "";

	if (endpoint.substring(0, 1) !== "/") endpoint = `/${endpoint}`;
	if (endpoint.substring(endpoint.length - 1) === "/") endpoint = endpoint.substring(0, endpoint.length - 1);

	if (!network) network = { endpoint: "" } as any;

	network.endpoint = endpoint;
	return network;
}

export function convertToBase64(tree: any): string {
	return Buffer.from(JSON.stringify(tree)).toString("base64");
}


export function getPathData(dynamicId: number, hubUrl?: string) {
	const path = hubUrl ? `${hubUrl}/sceen/_?u=${dynamicId}` : `/sceen/_?u=${dynamicId}`;
	return axios.get(hubUrl).then((response) => {
		// return Buffer.from(response.data);
		return response.data;
	});
}

export function waitModelReady(model: Ptr) {
	return new Promise((resolve, reject) => {
		model.load((path) => {
			if (!path) return resolve(true);

			const delay = 3000;
			const intervalTime = 300;
			let time = 0;

			const wait = () => {
				setTimeout(() => {
					const remaining = path.remaining.get();

					if (remaining == 0 || time >= delay) {
						resolve(true);
					} else {
						time += intervalTime;
						wait();
					}
				}, intervalTime);
			};

			wait();
		});
	});
}


// export function waitModelReady(model: Str) {
// 	const delay = 3000;
// 	const intervalTime = 300;

// 	return new Promise((resolve) => {
// 		let time = 0;

// 		const wait = () => {
// 			setTimeout(() => {
// 				const text = model.get();
// 				//@ts-ignore
// 				if ((text && text.length > 0) || time >= delay) {
// 					resolve(true);
// 				} else {
// 					time += intervalTime;
// 					wait();
// 				}
// 			}, intervalTime);
// 		};

// 		wait();
// 	});
// }