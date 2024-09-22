import express from "express";
import { createRecipe, getRecipieBYId ,getAllRecipe} from '../controllers/recipie.controller.js';
const router = express.Router();

router.post('/registerRecipie', createRecipe);
router.get('/registerRecipie', getAllRecipe);
router.get('/registerRecipie/:id', getRecipieBYId);

export default router;
