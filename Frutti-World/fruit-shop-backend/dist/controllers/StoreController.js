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
exports.createStore = void 0;
const Store_1 = __importDefault(require("../models/Store"));
// Controller to create a new store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { storeId, storeName } = req.body;
    // Check if all required fields are provided
    if (!storeId || !storeName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Create new store
        const store = new Store_1.default({
            storeId,
            storeName,
        });
        // Save the store to the database
        yield store.save();
        // Send success response
        res.status(201).json({ message: 'Store created successfully', store });
    }
    catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'An error occurred while creating the store' });
    }
});
exports.createStore = createStore;
