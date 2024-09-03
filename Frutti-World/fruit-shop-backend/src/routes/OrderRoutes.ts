import { Router } from "express";
import { createOrder, updateOrder, getOrderById, deleteOrder, addProductToOrder } from "../controllers/OrderController";

const router = Router();

// Route to create a new order
router.post('/createOrder', createOrder);

// Route to update an existing order by OrderID
router.put('/updateOrder/:OrderID', updateOrder);

// Route to delete an order by OrderID
router.delete('/deleteOrder/:OrderID', deleteOrder);

// Route to add a product to an existing order
router.post('/addNewProduct/:OrderID', addProductToOrder);

// Route to get all orders
// router.get('/', getOrders);

// Route to get a specific order by OrderID
router.get('/:OrderID', getOrderById);



export default router;