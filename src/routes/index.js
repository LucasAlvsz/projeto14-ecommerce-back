import { Router } from "express"

import userRouter from "./authRoutes.js"
import productRouter from "./productRoutes.js"

const router = Router()

router.use(userRouter)
router.use(productRouter)

export default router
