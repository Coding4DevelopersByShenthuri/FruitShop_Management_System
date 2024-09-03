import { Schema, model } from 'mongoose';

interface IStore {
    storeId: number;
    storeName: string;
}

const storeSchema = new Schema<IStore>({
    storeId: { type: Number, required: true, unique: true },
    storeName: { type: String, required: true },
});

const Store = model<IStore>('Store', storeSchema);

export default Store;