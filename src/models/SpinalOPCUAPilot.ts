

import { spinalCore, Model, Ptr, Lst, Choice, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-model-graph';
import { v4 as uuidv4 } from "uuid";
import { IRequest } from '../interfaces';
import { SpinalOrganOPCUA } from './SpinalOrganOPCUA';
import { resolve } from 'path';


class SpinalOPCUAPilot extends Model{
    constructor(organ: SpinalNode, request: IRequest | IRequest[]) {
        super();
        this.add_attr({
            id: uuidv4(),
            state: new Choice(0, ["init", "process", "success", "error"]),
            organ: new Pbr(organ),
            request: Array.isArray(request) ? new Lst(request) : new Lst([request])
        })
    }

    public setNormalMode() {
        this.state.set("normal");
    }
  
    public setProcessMode() {
        this.state.set("process");
    }
  
    public setSuccessMode() {
        this.state.set("success");
    }
  
    public setErrorMode() {
        this.state.set("error");
    }


    public getOrgan(): Promise<SpinalNode> {
        return new Promise((resolve, reject) => {
            this.organ.load(value => resolve(value));
        });
    }
}

//@ts-ignore
spinalCore.register_models([SpinalOPCUAPilot])
export default SpinalOPCUAPilot;
export { SpinalOPCUAPilot };