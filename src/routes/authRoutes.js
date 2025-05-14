import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post('/register-user', register)
// router.post('/login-user', login)
router.post('/login-user', (req, res, next) => {
    console.log('ROUTE login-user terpanggil');
    next(); // lanjut ke controller
  }, login);
  

export default router;