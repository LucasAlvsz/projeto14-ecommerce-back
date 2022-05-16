import db from "../db/db.js"
import { ObjectId } from "mongodb"

export const getCategories = async (req, res) => {
	try {
		const categories = await db.collection("categories").find({}).toArray()
		res.send(categories)
	} catch (err) {
		res.status(500).send(err)
	}
}

export const postCategory = async (req, res) => {
	try {
		const { name } = req.body
		const category = await db.collection("categories").insertOne({ name })
		res.sendStatus(201)
	} catch (err) {
		res.sendstatus(500)
	}
}

export const putCategory = async (req, res) => {
	try {
		const { name } = req.body
		const { categoryId } = req.params
		const category = await db
			.collection("categories")
			.findOneAndUpdate(
				{ _id: new ObjectId(categoryId) },
				{ $set: { name } }
			)
		if (!category) return res.sendStatus(404)
		res.sendStatus(200)
	} catch (err) {
		res.sendstatus(500)
	}
}

export const deleteCategory = async (req, res) => {
	try {
		const { categoryId } = req.params
		const category = await db
			.collection("categories")
			.findOneAndDelete({ _id: new ObjectId(categoryId) })
		if (!category) return res.status(404).send("Category not found")
		res.sendStatus(200)
	} catch (err) {
		res.sendstatus(500)
	}
}
