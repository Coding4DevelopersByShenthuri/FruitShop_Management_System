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
exports.createSeller = exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
// Register new User with Buyer role
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Create User body:', req.body);
    const { username, email, password, address, phone, userType = "Buyer" } = req.body;
    if (!username || !email || !password || !address || !phone || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if email already exists
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Check if username already exists
        const userNameExists = yield User_1.User.findOne({ username });
        if (userNameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Create new user
        const user = new User_1.User({
            username,
            email,
            password,
            address,
            phone,
            userType,
        });
        yield user.save();
        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        // Send response
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({ message: 'An error occurred during registration' });
    }
});
exports.register = register;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        // Find user by email
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Check password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        // Send response
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    }
    catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});
exports.login = login;
// Logout user
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('jwt', { httpOnly: true });
    return res.status(200).json({ message: 'Successfully logged out' });
});
exports.logout = logout;
const createSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Create Seller body:', req.body);
    const { username, email, password, address, phone, userType = "Seller", storeId } = req.body;
    if (!username || !email || !password || !address || !phone || !userType || !storeId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if email already exists
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Check if username already exists
        const userNameExists = yield User_1.User.findOne({ username });
        if (userNameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Create new user
        const user = new User_1.User({
            username,
            email,
            password,
            address,
            phone,
            userType,
            storeId,
        });
        yield user.save();
        // Send response
        res.status(201).json({ message: 'Seller registered successfully', user: { username, email } });
    }
    catch (error) {
        console.error('Error during seller registration:', error);
        res.status(400).json({ message: 'An error occurred during registration' });
    }
});
exports.createSeller = createSeller;
