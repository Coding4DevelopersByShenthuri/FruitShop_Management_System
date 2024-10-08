"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fruitSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Fruit = (0, mongoose_1.model)('Fruit', fruitSchema);
exports.default = Fruit;
