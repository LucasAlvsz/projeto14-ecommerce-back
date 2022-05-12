import { Router } from "express"

import { postProducts, getProducts } from "../controllers/productsController.js"

const productsRouter = Router()

productsRouter.get("/products", getProducts)
productsRouter.get("/products/:id", (req, res) => {
	res.send("Hello World!")
})
productsRouter.post("/products", postProducts)

export default productsRouter
