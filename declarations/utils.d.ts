import { Ptr } from "spinal-core-connectorjs_type";
import { IServer, INetwork } from "./interfaces";
export declare function _formatNetwork(network: INetwork): INetwork;
export declare function _formatServer(server: IServer): IServer;
export declare function convertToBase64(tree: any): string;
export declare function getPathData(dynamicId: number, hubUrl?: string): Promise<Uint8Array>;
export declare function waitModelReady(model: Ptr): Promise<unknown>;
