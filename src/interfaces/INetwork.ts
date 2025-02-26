import { IServer } from "./IServer";

export interface INetwork {
	name?: string;
	gateways: IServer[];
}
