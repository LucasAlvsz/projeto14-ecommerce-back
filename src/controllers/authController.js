import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dayjs from "dayjs"

import db from "./../db/db.js"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const emailExists = await db.collection("users").findOne({ email })
    if (emailExists)
      return res.status(409).send("email, this email already exists")

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.BCRYPT_SALT),
    )

    const newUser = {
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    }

    await db.collection("users").insertOne(newUser)
    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
    console.error(e)
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const userExists = await db.collection("users").findOne({ email })
    if (!userExists) return res.status(404).send("user, user not found.")

    if (!bcrypt.compareSync(password, userExists.password))
      return res.status(401).send("password, this password is wrong.")

    const filter = { $and: [{ userId: userExists._id }, { loggedIn: true }] }
    const update = {
      $set: {
        loggedIn: false,
        loggoutDate: dayjs().format("HH:mm - DD/MM/YY"),
      },
    }
    await db.collection("sessions").updateMany(filter, update)

    const { insertedId } = await db.collection("sessions").insertOne({
      userId: userExists._id,
      loggedIn: true,
      loginDate: dayjs().format("HH:mm - DD/MM/YY"),
      loggoutDate: null,
    })

    const DAY_IN_SECONDS = 60 * 60 * 24
    const data = {
      userId: userExists._id,
      sessionId: insertedId,
    }
    const secret = process.env.JWT_SECRET
    const config = { expiresIn: DAY_IN_SECONDS }
    const token = jwt.sign(data, secret, config)

    res.send({ name: userExists.name, token })
  } catch (e) {
    res.sendStatus(500)
    console.error(e)
  }
}
