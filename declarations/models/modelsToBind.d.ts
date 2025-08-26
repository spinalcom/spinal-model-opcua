import { Lst, Model } from "spinal-core-connectorjs";
export default class ModelsInfo<T extends Model> extends Model {
    constructor();
    addModel(discoverModel: T): Promise<number>;
    getModels(): Promise<Lst<T>>;
    consumeModels(): Promise<T[]>;
    removeModel(discoverModel: T): Promise<boolean>;
}
export { ModelsInfo };
