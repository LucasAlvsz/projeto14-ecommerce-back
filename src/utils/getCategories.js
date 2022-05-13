import db from "../db/db.js"

export const getCategories = async () => {
	try {
		const categories = await db.collection("categories").find({}).toArray()
		return categories.map(category => category.name)
	} catch (error) {
		console.log(error)
		return -1
	}
}

export default getCategories
