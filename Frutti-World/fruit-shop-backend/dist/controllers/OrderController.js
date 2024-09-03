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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.deleteOrder = exports.addProductToOrder = exports.updateOrder = exports.createOrder = void 0;
const Order_1 = require("../models/Order");
const uuid_1 = require("uuid");
const Utils_1 = require("../utils/Utils");
// Generate a unique OrderID
const generateOrderID = () => {
    return (0, uuid_1.v4)(); // Generates a unique ID
};
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, BuyerID } = req.body;
        // Check if all required fields are provided
        if (!products || !BuyerID) {
            return res.status(400).json({ message: 'Products and BuyerID are required' });
        }
        // Check if an existing order exists for this BuyerID
        const existingOrder = yield Order_1.Order.findOne({ BuyerID, Status: 'InCart' });
        if (existingOrder) {
            return res.status(400).json({ message: 'An active order already exists for this buyer' });
        }
        // Calculate TotalAmount
        const TotalAmount = (0, Utils_1.calculateTotalAmount)(products);
        // Create a new order
        const order = new Order_1.Order({
            OrderID: generateOrderID(), // Generate a unique order ID
            products,
            TotalAmount,
            BuyerID,
            Status: 'InCart', // Default status
            OrderDate: new Date() // Set the order date to now
        });
        yield order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order' });
    }
});
exports.createOrder = createOrder;
// Update the quantity of a specific product in an order
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderID } = req.params;
        const { productId, newQuantity } = req.body;
        // Check if all required fields are provided
        if (!OrderID || !productId || newQuantity === undefined) {
            return res.status(400).json({ message: 'OrderID, productId, and newQuantity are required' });
        }
        // Find the order
        const order = yield Order_1.Order.findOne({ OrderID });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Find the product in the order and update its quantity
        const product = order.products.find(p => p._id.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in order' });
        }
        // Update quantity
        product.quantity = newQuantity;
        // Recalculate TotalAmount
        const updatedTotalAmount = (0, Utils_1.calculateTotalAmount)(order.products);
        order.TotalAmount = updatedTotalAmount;
        // Save the updated order
        yield order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    }
    catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'An error occurred while updating the order' });
    }
});
exports.updateOrder = updateOrder;
// Add a product to an existing order
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderID } = req.params;
        const { product } = req.body; // { name, quantity, price }
        // Validate input
        if (!OrderID || !product || !product.name || product.quantity === undefined || product.price === undefined) {
            return res.status(400).json({ message: 'OrderID and product details are required' });
        }
        // Find the order
        const order = yield Order_1.Order.findOne({ OrderID });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Add the new product to the order's products array
        order.products.push(product);
        // Recalculate TotalAmount
        const TotalAmount = (0, Utils_1.calculateTotalAmount)(order.products);
        order.TotalAmount = TotalAmount;
        // Save the updated order
        yield order.save();
        res.status(200).json({ message: 'Product added successfully', order });
    }
    catch (error) {
        console.error('Error adding product to order:', error);
        res.status(500).json({ message: 'An error occurred while adding the product to the order' });
    }
});
exports.addProductToOrder = addProductToOrder;
// Delete an order by OrderID
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete request received");
    try {
        const { OrderID } = req.params;
        // Ensure OrderID is provided
        if (!OrderID) {
            return res.status(400).json({ message: 'OrderID is required' });
        }
        // Find and delete the order
        const deletedOrder = yield Order_1.Order.findOneAndDelete({ OrderID });
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    }
    catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'An error occurred while deleting the order' });
    }
});
exports.deleteOrder = deleteOrder;
// Get all orders
// export const getOrders = async (req: Request, res: Response) => {
//     try {
//         const orders = await Order.find();
//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'An error occurred while fetching the orders' });
//     }
// };
// Get a specific order by OrderID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderID } = req.params;
        const order = yield Order_1.Order.findOne({ OrderID });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'An error occurred while fetching the order' });
    }
});
exports.getOrderById = getOrderById;
