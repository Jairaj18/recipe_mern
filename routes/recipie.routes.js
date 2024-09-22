import express from "express";
import { createRecipe, getRecipieBYId ,getAllRecipe} from '../controllers/recipie.controller.js';
import { Authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post('/registerRecipie', Authenticate , createRecipe);
router.get('/getAllRecipe',Authenticate, getAllRecipe);
router.get('/registerRecipie/:id', getRecipieBYId);

export default router;
