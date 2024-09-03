import { Request, Response } from "express";
import Store from "../models/Store";

// Controller to create a new store
export const createStore = async (req: Request, res: Response) => {
    const { storeId, storeName } = req.body;

    // Check if all required fields are provided
    if (!storeId || !storeName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new store
        const store = new Store({
            storeId,
            storeName,
        });

        // Save the store to the database
        await store.save();

        // Send success response
        res.status(201).json({ message: 'Store created successfully', store });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'An error occurred while creating the store' });
    }
};