"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StoreController_1 = require("../controllers/StoreController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', StoreController_1.createStore);
exports.default = router;
