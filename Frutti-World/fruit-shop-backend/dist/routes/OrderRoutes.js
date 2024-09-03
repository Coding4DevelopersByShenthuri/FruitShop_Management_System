"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const router = (0, express_1.Router)();
// Route to create a new order
router.post('/createOrder', OrderController_1.createOrder);
// Route to update an existing order by OrderID
router.put('/updateOrder/:OrderID', OrderController_1.updateOrder);
// Route to delete an order by OrderID
router.delete('/deleteOrder/:OrderID', OrderController_1.deleteOrder);
// Route to add a product to an existing order
router.post('/addNewProduct/:OrderID', OrderController_1.addProductToOrder);
// Route to get all orders
// router.get('/', getOrders);
// Route to get a specific order by OrderID
router.get('/:OrderID', OrderController_1.getOrderById);
exports.default = router;
