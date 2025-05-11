import express from "express";
import { getAllFinansialController, addFinansialController, sortingFinansialController, searchFinansialController } from "../controllers/finansialController.js";

const router = express.Router();

router.get("/get-finansial", getAllFinansialController);
router.post("/add-finansial", addFinansialController);
router.get("/sort-finansial", sortingFinansialController);
router.get("/search-finansial", searchFinansialController);

export default router;
