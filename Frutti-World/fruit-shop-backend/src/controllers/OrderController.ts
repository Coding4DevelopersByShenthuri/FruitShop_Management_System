import { Request, Response } from "express";
import { Order } from "../models/Order";

import { v4 as uuidv4 } from 'uuid';
import { calculateTotalAmount } from "../utils/Utils";

// Generate a unique OrderID
const generateOrderID = () => {
    return uuidv4(); // Generates a unique ID
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { products, BuyerID } = req.body;

        // Check if all required fields are provided
        if (!products || !BuyerID) {
            return res.status(400).json({ message: 'Products and BuyerID are required' });
        }

        // Check if an existing order exists for this BuyerID
        const existingOrder = await Order.findOne({ BuyerID, Status: 'InCart' });

        if (existingOrder) {
            return res.status(400).json({ message: 'An active order already exists for this buyer' });
        }

        // Calculate TotalAmount
        const TotalAmount = calculateTotalAmount(products);

        // Create a new order
        const order = new Order({
            OrderID: generateOrderID(),  // Generate a unique order ID
            products,
            TotalAmount,
            BuyerID,
            Status: 'InCart', // Default status
            OrderDate: new Date()  // Set the order date to now
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order' });
    }
};



// Update the quantity of a specific product in an order
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { OrderID } = req.params;
        const { productId, newQuantity } = req.body;

        // Check if all required fields are provided
        if (!OrderID || !productId || newQuantity === undefined) {
            return res.status(400).json({ message: 'OrderID, productId, and newQuantity are required' });
        }

        // Find the order
        const order = await Order.findOne({ OrderID });
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
        const updatedTotalAmount = calculateTotalAmount(order.products);
        order.TotalAmount = updatedTotalAmount;

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'An error occurred while updating the order' });
    }
};



// Add a product to an existing order
export const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const { OrderID } = req.params;
        const { product } = req.body; // { name, quantity, price }

        // Validate input
        if (!OrderID || !product || !product.name || product.quantity === undefined || product.price === undefined) {
            return res.status(400).json({ message: 'OrderID and product details are required' });
        }

        // Find the order
        const order = await Order.findOne({ OrderID });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Add the new product to the order's products array
        order.products.push(product);

        // Recalculate TotalAmount
        const TotalAmount = calculateTotalAmount(order.products);
        order.TotalAmount = TotalAmount;

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Product added successfully', order });
    } catch (error) {
        console.error('Error adding product to order:', error);
        res.status(500).json({ message: 'An error occurred while adding the product to the order' });
    }
};

// Delete an order by OrderID
export const deleteOrder = async (req: Request, res: Response) => {
    console.log("Delete request received");
    try {
        const { OrderID } = req.params;

        // Ensure OrderID is provided
        if (!OrderID) {
            return res.status(400).json({ message: 'OrderID is required' });
        }

        // Find and delete the order
        const deletedOrder = await Order.findOneAndDelete({ OrderID });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'An error occurred while deleting the order' });
    }
};



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
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { OrderID } = req.params;

        const order = await Order.findOne({ OrderID });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'An error occurred while fetching the order' });
    }
};
