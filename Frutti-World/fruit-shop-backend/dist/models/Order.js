"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});
const orderSchema = new mongoose_1.Schema({
    OrderID: { type: String, required: true, unique: true },
    OrderDate: { type: Date, default: Date.now },
    Status: { type: String, enum: ['InCart', 'OrderSuccess'], default: 'InCart' },
    products: [productSchema],
    TotalAmount: { type: Number, required: true },
    BuyerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Buyer', required: true }
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
