import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import productsRouter from "./routes/productsRouter.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(productsRouter)
app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.listen(process.env.PORT || 5000, () => {
	console.log(`Server is running on port ${process.env.PORT || 5000}`)
})
