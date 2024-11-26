import { Ptr } from "spinal-core-connectorjs_type";
import { IServer } from "./interfaces/IServer";
export declare function _formatNetwork(network: IServer): IServer;
export declare function convertToBase64(tree: any): string;
export declare function getPathData(dynamicId: number, hubUrl?: string): Promise<any>;
export declare function waitModelReady(model: Ptr): Promise<unknown>;
