import { Router } from "express"

import userRouter from "./authRoutes.js"
import productsRouter from "./productsRoutes.js"
import cartRouter from "./cartRoutes.js"
import checkoutRouter from "./checkoutRoutes.js"
import categoriesRouter from "./categoriesRoutes.js"

const router = Router()

router.use(userRouter)
router.use(productsRouter)
router.use(cartRouter)
router.use(checkoutRouter)
router.use(categoriesRouter)

export default router
