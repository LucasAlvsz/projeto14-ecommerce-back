import db from "../db/db.js"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

export const productIdValidation = async (req, res, next) => {
	const { productId } = req.params
	try {
		const product = await db
			.collection("products")
			.findOne({ _id: new ObjectId(productId) })
		if (!product) return res.status(404).send("Product, Product not found")
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export const validateToken = async (req, res, next) => {
	const { authorization } = req.headers
	const token = authorization.replace("Bearer ", "").trim()
	try {
		const secret = process.env.JWT_SECRET
		const data = jwt.verify(token, secret)
		const user = await db.collection("users").findOne({
			_id: new ObjectId(data.userId),
		})
		if (!user) return res.status(404).send("user, this user was not found.")

		const session = await db.collection("sessions").findOne({
			$and: [{ _id: new ObjectId(data.sessionId) }, { loggedIn: true }],
		})
		if (!session)
			return res.status(401).send("session, this session is invalid.")

		delete user.password

		res.locals.user = user
		res.locals.session = session

		next()
	} catch (e) {
		res.sendStatus(500)
		console.error(e)
	}
}
