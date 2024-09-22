import express from "express";
// user.routes.js
import { Authenticate } from "../middleware/auth.js";
import { userLogin, userRegister ,sendMailToResetPassword,resetPassword} from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/sendEmailToChangePassword',sendMailToResetPassword )
router.post('/resetPassword/:id/:token', resetPassword )

export default router;
