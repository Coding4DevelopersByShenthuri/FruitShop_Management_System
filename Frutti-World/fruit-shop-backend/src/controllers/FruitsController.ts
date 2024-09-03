import { AuthRequest } from './../middleware/authMiddleware';
import { Request, Response } from "express";
import Fruit from "../models/Fruits"; // Adjust the path if necessary

// Controller to create a new fruit
export const addFruit = async (req: Request, res: Response) => {
    const { productName, description, price, stock } = req.body;
    // Need to add seller ID
    const sellerId = (req as AuthRequest).user?._id;
    console.log(sellerId);
    // Check if all required fields are provided
    if (!productName || !description || !price || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new fruit
        const fruit = new Fruit({
            productName, 
            description, 
            price, 
            stock,
            sellerId,
        });

        // Save the fruit to the database
        await fruit.save();

        // Send success response
        res.status(201).json({ message: 'Fruit added successfully', fruit });
    } catch (error) {
        console.error('Error adding fruit:', error);
        res.status(500).json({ message: 'An error occurred while adding the fruit' });
    }
};

export const getFruitsBySellerId = async (req: Request, res: Response) => {
    const { sellerId } = req.params;

    try {
        // Find all fruits by sellerId
        const fruits = await Fruit.find({ sellerId });

        // Send success response
        res.status(200).json({ fruits });
    } catch (error) {
        console.error('Error fetching fruits:', error);
        res.status(500).json({ message: 'An error occurred while fetching the fruits' });
    }
}

// Controller to update an existing fruit
export const updateFruit = async (req: Request, res: Response) => {
    const { ProductID } = req.params; // Get ProductID from the URL params
    const { ProductName, Description, Price, Quantity, CategoryID, SellerID, ImageURL } = req.body;

    // Check if ProductID is provided
    if (!ProductID) {
        return res.status(400).json({ message: 'ProductID is required' });
    }

    try {
        // Find the fruit by ProductID and update it with the provided data
        const updatedFruit = await Fruit.findOneAndUpdate(
            { ProductID }, // Filter
            { ProductName, Description, Price, Quantity, CategoryID, SellerID, ImageURL }, // Update data
            { new: true } // Return the updated document
        );

        // If the fruit is not found
        if (!updatedFruit) {
            return res.status(404).json({ message: 'Fruit not found' });
        }

        // Send success response
        res.status(200).json({ message: 'Fruit updated successfully', fruit: updatedFruit });
    } catch (error) {
        console.error('Error updating fruit:', error);
        res.status(500).json({ message: 'An error occurred while updating the fruit' });
    }
};

// Delete a fruit by ProductID
export const deleteFruit = async (req: Request, res: Response) => {
    try {
        const { ProductID } = req.params; // Ensure the parameter name matches the route

        // Find and delete the fruit
        const deletedFruit = await Fruit.findOneAndDelete({ ProductID });

        if (!deletedFruit) {
            return res.status(404).json({ message: 'Fruit not found' });
        }

        res.status(200).json({ message: 'Fruit deleted successfully', fruit: deletedFruit });
    } catch (error) {
        console.error('Error deleting fruit:', error);
        res.status(500).json({ message: 'An error occurred while deleting the fruit' });
    }
};