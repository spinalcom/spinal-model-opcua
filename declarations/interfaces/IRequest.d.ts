import { IServer } from "./IServer";
export interface IRequest {
    nodeId: string;
    path: string;
    value: string | number | boolean;
    networkInfo: IServer;
}
