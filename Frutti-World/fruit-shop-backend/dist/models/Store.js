"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    storeId: { type: Number, required: true, unique: true },
    storeName: { type: String, required: true },
});
const Store = (0, mongoose_1.model)('Store', storeSchema);
exports.default = Store;
