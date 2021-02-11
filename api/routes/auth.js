import express from "express";
import AuthanticationController from "../controllers/authentication_controller";
import UserController from '../controllers/user_controller';

import edit_validator from '../middlewares/edit_validator';
import signupValidator from "../middlewares/authMiddlewares/signup_validator";
import signinValidator from "../middlewares/authMiddlewares/signin_validator";

const router = express.Router();
router.post("/signup", signupValidator, AuthanticationController.register);
router.post("/signin", signinValidator, AuthanticationController.login);
router.get("/users", UserController.viewUsers);
router.put("/edit/:id", edit_validator, UserController.editUser);



export default router;