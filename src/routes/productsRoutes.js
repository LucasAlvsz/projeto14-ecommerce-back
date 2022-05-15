import { Router } from "express"

import {
  getProductsValidation,
  getProductsIdValidation,
  postProductsValidation,
  putProductsIdValidation,
  deleteProductsIdValidation,
} from "../middlewares/productsValidationMiddlewares.js"
import { productIdValidation } from "../middlewares/dbValidationMiddlewares.js"
import {
  getAllProducts,
  searchProducts,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/productsController.js"

const productsRouter = Router()
productsRouter.get("/products", getAllProducts)
productsRouter.get("/products/search", getProductsValidation, searchProducts)
productsRouter.get(
  "/product/:productId",
  getProductsIdValidation,
  productIdValidation,
  searchProducts,
)
productsRouter.post("/products", postProductsValidation, postProducts)
productsRouter.put(
  "/products/:productId",
  putProductsIdValidation,
  productIdValidation,
  putProducts,
)
productsRouter.delete(
  "/products/:productId",
  deleteProductsIdValidation,
  productIdValidation,
  deleteProducts,
)
// productsRouter.post("/category", )

export default productsRouter
