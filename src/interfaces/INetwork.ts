export interface INetwork {
	name?: string;
	listen?: boolean;
	saveTimeSeries?: boolean;
	interval: number;
}
