import { Router } from "express"

import userRouter from "./authRoutes.js"
import productsRouter from "./productsRoutes.js"
import cartRouter from "./cartRoutes.js"
import checkoutRouter from "./checkoutRoutes.js"

const router = Router()

router.use(userRouter)
router.use(productsRouter)
router.use(cartRouter)
router.use(checkoutRouter)

export default router
