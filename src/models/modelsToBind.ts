import { Lst, Model, Ptr, spinalCore } from "spinal-core-connectorjs";

export default class ModelsInfo<T extends Model> extends Model {
    constructor() {
        super();
        this.add_attr({
            modification_date: Date.now(),
            length: 0,
            data: new Ptr(new Lst())
        })
    }

    public async addModel(discoverModel: T): Promise<number> {
        const dataList = await this.getDiscoverModels();
        dataList.push(discoverModel);
        this.length.set(dataList.length);
        return dataList.length;
    }

    public getModels(): Promise<Lst<T>> {
        return new Promise((resolve) => {
            this.data.load((discoverList) => resolve(discoverList));
        });
    }

    public async removeModel(discoverModel: T): Promise<boolean> {

        const dataList = await this.getDiscoverModels();
        const lengthBeforeRemove = dataList.length;
        dataList.remove(discoverModel);
        this.length.set(dataList.length);

        return this.length.get() < lengthBeforeRemove;
    }
}


spinalCore.register_models([ModelsInfo]);

export { ModelsInfo };