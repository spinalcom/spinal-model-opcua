

import { spinalCore, Model, Ptr, Lst, Choice, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-model-graph';
import { v4 as uuidv4 } from "uuid";
import { IRequest } from '../interfaces';


class SpinalOPCUAPilot extends Model {
    constructor(organ?: SpinalNode, request?: IRequest | IRequest[]) {
        super();
        if (!organ || !request) return;

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

    public addToNode(endpoint: SpinalNode<any>): Promise<any> {
        return new Promise((resolve) => {
            if (!endpoint.info.pilot) {
                const model = new Lst();
                model.push(this);
                endpoint.info.add_attr({ pilot: new Ptr(model) });
                resolve(model);
            } else {
                endpoint.info.pilot.load(lst => {
                    lst.push(this)
                    resolve(lst);
                })
            }
        }).then((res) => {
            this.add_attr({ node: endpoint });
            return res;
        })
    }

    public removeFromNode(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.node) {
                this.node.info.pilot.load(lst => {
                    for (let i = 0; i < lst.length; i++) {
                        const element = lst[i];
                        if (element.id.get() === this.id.get()) {
                            lst.splice(i);
                            break;
                        }
                    }
                    resolve(true);
                })
            } else {
                resolve(false)
            }
        });
    }
}

spinalCore.register_models([SpinalOPCUAPilot])
export default SpinalOPCUAPilot;
export { SpinalOPCUAPilot };