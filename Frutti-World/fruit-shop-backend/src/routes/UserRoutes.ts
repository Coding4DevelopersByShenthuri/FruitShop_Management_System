import { login, logout, register, createSeller } from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.post('/', register);
router.post('/seller', createSeller);
router.post('/login', login);
router.post('/logout', logout);

export default router;