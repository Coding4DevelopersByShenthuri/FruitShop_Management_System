"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
const Order_1 = require("../models/Order");
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PaymentID, Amount, OrderID } = req.body;
        // Check if all required fields are provided
        if (!PaymentID || !Amount || !OrderID) {
            return res.status(400).json({ message: 'PaymentID, Amount, and OrderID are required' });
        }
        // Create a new payment
        const payment = new Payment_1.default({
            PaymentID,
            Amount,
            OrderID,
            PaymentDate: new Date()
        });
        // Save the payment
        yield payment.save();
        // Delete the order after payment is created
        const deletedOrder = yield Order_1.Order.findOneAndDelete({ OrderID });
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(201).json({ message: 'Payment created successfully, and order deleted', payment });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'An error occurred while creating the payment' });
    }
});
exports.createPayment = createPayment;
