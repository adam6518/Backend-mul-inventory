import express from "express";
import { addOrderController, getAllDataOrderController, deleteDataOrderController,
    searchDataOrderController, updateOrderController, deleteAllOrderController
 } from "../controllers/orderController.js";

const router = express.Router();

router.post("/add-order", addOrderController);
router.get("/get-order", getAllDataOrderController)
router.delete("/delete-order/:orderId", deleteDataOrderController)
router.get("/search-order", searchDataOrderController)
router.put("/update-order", updateOrderController)
router.delete("/delete-all-order", deleteAllOrderController)

export default router;
