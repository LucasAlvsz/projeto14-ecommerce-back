import { Router } from "express"

import { signup } from "../controllers/authController.js"

const userRouter = Router()

userRouter.post("/sign-up", signup)

export default userRouter
