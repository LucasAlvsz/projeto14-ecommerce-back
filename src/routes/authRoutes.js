import { Router } from "express"

import { signUp, signIn } from "../controllers/authController.js"
import {
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidationMiddleware.js"

const userRouter = Router()

userRouter.post("/sign-up", signUpValidation, signUp)
userRouter.post("/sign-in", signInValidation, signIn)

export default userRouter
