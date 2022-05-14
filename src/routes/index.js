import { Router } from "express"

import userRouter from "./authRoutes.js"
import productsRouter from "./productsRoutes.js"
import cartRouter from "./cartRoutes.js"

const router = Router()

router.use(userRouter)
router.use(productsRouter)
router.use(cartRouter)

export default router
