import { Schema, model, Types, Document } from 'mongoose';

interface IFruit extends Document {
    productName: string;
    description: string;
    price: number;
    stock: number;
    sellerId: Types.ObjectId;
}

const fruitSchema = new Schema<IFruit>({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Fruit = model<IFruit>('Fruit', fruitSchema);

export default Fruit;