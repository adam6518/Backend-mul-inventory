import express from "express"
import { addProjectController, getAllDataProjectController, deleteDataProjectController, searchDataProjectController,
    updateProjectController
 } from "../controllers/projectController.js"

const router = express.Router();

router.post('/add-project', addProjectController);
router.get('/get-project', getAllDataProjectController)
router.delete('/delete-project/:projectId', deleteDataProjectController)
router.get('/search-project', searchDataProjectController)
router.put('/update-project', updateProjectController);

export default router;