import express from "express";
import { getAllRiwayatController, addRiwayatController, searchRiwayatController,
    sortingRiwayatController
 } from "../controllers/riwayatController.js";

const router = express.Router();

router.get("/get-riwayat", getAllRiwayatController);
router.post("/add-riwayat", addRiwayatController);
router.get("/search-riwayat", searchRiwayatController)
router.get("/sort-riwayat", sortingRiwayatController)

export default router;
