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
exports.deleteFruit = exports.updateFruit = exports.getFruitsBySellerId = exports.addFruit = void 0;
const Fruits_1 = __importDefault(require("../models/Fruits")); // Adjust the path if necessary
// Controller to create a new fruit
const addFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productName, description, price, stock } = req.body;
    // Need to add seller ID
    const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    console.log(sellerId);
    // Check if all required fields are provided
    if (!productName || !description || !price || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Create new fruit
        const fruit = new Fruits_1.default({
            productName,
            description,
            price,
            stock,
            sellerId,
        });
        // Save the fruit to the database
        yield fruit.save();
        // Send success response
        res.status(201).json({ message: 'Fruit added successfully', fruit });
    }
    catch (error) {
        console.error('Error adding fruit:', error);
        res.status(500).json({ message: 'An error occurred while adding the fruit' });
    }
});
exports.addFruit = addFruit;
const getFruitsBySellerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    try {
        // Find all fruits by sellerId
        const fruits = yield Fruits_1.default.find({ sellerId });
        // Send success response
        res.status(200).json({ fruits });
    }
    catch (error) {
        console.error('Error fetching fruits:', error);
        res.status(500).json({ message: 'An error occurred while fetching the fruits' });
    }
});
exports.getFruitsBySellerId = getFruitsBySellerId;
// Controller to update an existing fruit
const updateFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductID } = req.params; // Get ProductID from the URL params
    const { ProductName, Description, Price, Quantity, CategoryID, SellerID, ImageURL } = req.body;
    // Check if ProductID is provided
    if (!ProductID) {
        return res.status(400).json({ message: 'ProductID is required' });
    }
    try {
        // Find the fruit by ProductID and update it with the provided data
        const updatedFruit = yield Fruits_1.default.findOneAndUpdate({ ProductID }, // Filter
        { ProductName, Description, Price, Quantity, CategoryID, SellerID, ImageURL }, // Update data
        { new: true } // Return the updated document
        );
        // If the fruit is not found
        if (!updatedFruit) {
            return res.status(404).json({ message: 'Fruit not found' });
        }
        // Send success response
        res.status(200).json({ message: 'Fruit updated successfully', fruit: updatedFruit });
    }
    catch (error) {
        console.error('Error updating fruit:', error);
        res.status(500).json({ message: 'An error occurred while updating the fruit' });
    }
});
exports.updateFruit = updateFruit;
// Delete a fruit by ProductID
const deleteFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ProductID } = req.params; // Ensure the parameter name matches the route
        // Find and delete the fruit
        const deletedFruit = yield Fruits_1.default.findOneAndDelete({ ProductID });
        if (!deletedFruit) {
            return res.status(404).json({ message: 'Fruit not found' });
        }
        res.status(200).json({ message: 'Fruit deleted successfully', fruit: deletedFruit });
    }
    catch (error) {
        console.error('Error deleting fruit:', error);
        res.status(500).json({ message: 'An error occurred while deleting the fruit' });
    }
});
exports.deleteFruit = deleteFruit;
