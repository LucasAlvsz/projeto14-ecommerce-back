import { Router } from "express"

import {
	getCategories,
	postCategory,
	putCategory,
	deleteCategory,
} from "../controllers/categoriesController.js"

import {
	postCategoryValidation,
	PutAndDeleteCategoryValidation,
} from "../middlewares/categoriesValidationMiddleware.js"

import {
	validateToken,
	categoryValidation,
	categoryIdValidation,
} from "../middlewares/dbValidationMiddlewares.js"

const categoriesRouter = Router()
categoriesRouter.use(validateToken)
categoriesRouter.get("/categories", getCategories)
categoriesRouter.post(
	"/categories",
	postCategoryValidation,
	categoryValidation,
	postCategory
)
categoriesRouter.put(
	"/categories/:categoryId",
	PutAndDeleteCategoryValidation,
	categoryIdValidation,
	putCategory
)
categoriesRouter.delete(
	"/categories/:categoryId",
	PutAndDeleteCategoryValidation,
	categoryIdValidation,
	deleteCategory
)

export default categoriesRouter
