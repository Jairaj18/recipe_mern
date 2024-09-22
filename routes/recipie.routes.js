import express from "express";
import { createRecipe, getRecipieBYId ,getAllRecipe,savedRecipeById} from '../controllers/recipie.controller.js';
import { Authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post('/registerRecipie', Authenticate , createRecipe);
router.get('/getAllRecipe',Authenticate, getAllRecipe);
router.get('/registerRecipie/:id', getRecipieBYId);
router.post('/saverecipi/:id', savedRecipeById)
export default router;
