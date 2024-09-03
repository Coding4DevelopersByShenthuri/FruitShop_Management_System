"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    PaymentID: {
        type: String,
        required: true,
        unique: true
    },
    PaymentDate: {
        type: Date,
        default: Date.now
    },
    Amount: {
        type: Number,
        required: true
    },
    OrderID: {
        type: String, // Change this from ObjectId to String
        required: true
    }
});
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;
