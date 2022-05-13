import db from "../db/db.js"
import { ObjectId } from "mongodb"

export const productIdValidation = async (req, res, next) => {
	const { productId } = req.params
	try {
		const product = await db
			.collection("products")
			.findOne({ _id: new ObjectId(productId) })
		if (!product) return res.status(404).send("Product not found")
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}
