import { createStore } from "../controllers/StoreController";
import { Router } from "express";

const router = Router();

router.post('/', createStore);

export default router;