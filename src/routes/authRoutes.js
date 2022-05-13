import { Router } from "express"

import { signUp } from "../controllers/authController.js"
import { signUpValidation } from "../middlewares/authValidationMiddleware.js"

const userRouter = Router()

userRouter.post("/sign-up", signUpValidation, signUp)

export default userRouter
