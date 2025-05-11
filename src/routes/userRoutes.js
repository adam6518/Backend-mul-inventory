import express from "express"
import { getAllDataUserController, deleteDataUserController, searchDataUserController,
    updateUserController
 } from "../controllers/userController.js";


const router = express.Router();

router.get('/get-user', getAllDataUserController)
router.delete('/delete-user/:userId', deleteDataUserController)
router.get('/search-user', searchDataUserController)
router.put('/update-user', updateUserController)

export default router