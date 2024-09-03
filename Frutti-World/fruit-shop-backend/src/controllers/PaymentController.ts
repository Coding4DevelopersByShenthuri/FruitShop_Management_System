import { Request, Response } from 'express';
import Payment from '../models/Payment';
import { Order } from '../models/Order';

export const createPayment = async (req: Request, res: Response) => {
    try {
        const { PaymentID, Amount, OrderID } = req.body;

        // Check if all required fields are provided
        if (!PaymentID || !Amount || !OrderID) {
            return res.status(400).json({ message: 'PaymentID, Amount, and OrderID are required' });
        }

        // Create a new payment
        const payment = new Payment({
            PaymentID,
            Amount,
            OrderID,
            PaymentDate: new Date()
        });

        // Save the payment
        await payment.save();

        // Delete the order after payment is created
        const deletedOrder = await Order.findOneAndDelete({ OrderID });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(201).json({ message: 'Payment created successfully, and order deleted', payment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'An error occurred while creating the payment' });
    }
};