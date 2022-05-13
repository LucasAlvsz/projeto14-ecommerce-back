import { Router } from "express"

import {
	getProductsValidation,
	getProductsIdValidation,
	postProductsValidation,
	putProductsIdValidation,
	deleteProductsIdValidation,
} from "../middlewares/productsMiddlewares.js"
import { productIdValidation } from "../middlewares/productIdMiddlewares.js"
import {
	getProducts,
	postProducts,
	putProducts,
	deleteProducts,
} from "../controllers/productsController.js"

const productsRouter = Router()

productsRouter.get("/products", getProductsValidation, getProducts)
productsRouter.get(
	"/products/:productId",
	getProductsIdValidation,
	productIdValidation,
	getProducts
)
productsRouter.post("/products", postProductsValidation, postProducts)
productsRouter.put(
	"/products/:productId",
	putProductsIdValidation,
	productIdValidation,
	putProducts
)
productsRouter.delete(
	"/products/:productId",
	deleteProductsIdValidation,
	productIdValidation,
	deleteProducts
)

export default productsRouter
