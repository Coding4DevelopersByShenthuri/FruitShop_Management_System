import { Schema, model, Document } from 'mongoose';

interface IProduct {
    [x: string]: any;
    name: string;
    quantity: number;
    price: number;
}

interface IOrder extends Document {
    OrderID: string;
    OrderDate: Date;
    Status: string;
    products: IProduct[];
    TotalAmount: number;
    BuyerID: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = new Schema<IOrder>({
    OrderID: { type: String, required: true, unique: true },
    OrderDate: { type: Date, default: Date.now },
    Status: { type: String, enum: ['InCart', 'OrderSuccess'], default: 'InCart' },
    products: [productSchema],
    TotalAmount: { type: Number, required: true },
    BuyerID: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true }
});

export const Order = model<IOrder>('Order', orderSchema);