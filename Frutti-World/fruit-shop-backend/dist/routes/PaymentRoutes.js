"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaymentController_1 = require("../controllers/PaymentController"); // Adjust the import path as necessary
const router = (0, express_1.Router)();
router.post('/createPayment', PaymentController_1.createPayment);
exports.default = router;
