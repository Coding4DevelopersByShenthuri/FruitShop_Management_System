"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const FruitsRoutes_1 = __importDefault(require("./routes/FruitsRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const StoreRoutes_1 = __importDefault(require("./routes/StoreRoutes"));
const OrderRoutes_1 = __importDefault(require("./routes/OrderRoutes"));
const PaymentRoutes_1 = __importDefault(require("./routes/PaymentRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();

const app = (0, express_1.default)();
const port = process.env.PORT || 5000;

// To allow cross-origin requests from the frontend
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/users', UserRoutes_1.default);
app.use('/api/v1/store', StoreRoutes_1.default);
app.use('/api/v1/fruits', FruitsRoutes_1.default);
app.use('/api/v1/orders', OrderRoutes_1.default);
app.use('/api/v1/payments', PaymentRoutes_1.default);

app.get('/', (req, res) => {
    res.send("hello");
});

mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fruitsshop")
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
