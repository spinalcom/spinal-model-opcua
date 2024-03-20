import { IServer } from "./IServer";

export interface IRequest {
    nodeId: string;
    value: string | number | boolean;
    networkInfo: IServer;
}