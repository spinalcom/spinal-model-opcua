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

    public async addModel(model: T): Promise<number> {
        const dataList = await this.getModels();
        dataList.push(model);
        this.length.set(dataList.length);
        this.modification_date.set(Date.now());
        return dataList.length;
    }

    public getModels(): Promise<Lst<T>> {
        return new Promise((resolve) => {
            this.data.load((discoverList) => resolve(discoverList));
        });
    }

    public consumeModels(): Promise<T[]> {
        return new Promise((resolve) => {
            this.data.load((discoverList) => {
                this.length.set(0);

                const arr: T[] = Array.from(discoverList);
                
                discoverList.clear();
                resolve(arr);
            });
        })
}

    public async removeModel(model: T): Promise<boolean> {
        const dataList = await this.getModels();
        const lengthBeforeRemove = dataList.length;
        dataList.remove(model);

        this.length.set(dataList.length);

        return this.length.get() < lengthBeforeRemove;
    }
}


spinalCore.register_models([ModelsInfo]);

export { ModelsInfo };