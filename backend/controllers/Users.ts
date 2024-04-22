import { RequestHandler } from "express"
import UserModel from "../models/User"
import bcrypt from "bcrypt"

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try {
        if (!username || !email || !passwordRaw ) {
            throw Error("Parameters missing")
        }
        const existingUsername = await UserModel.findOne({username: username}).exec()

        if (existingUsername) {
            throw Error("Username already taken, Please choose a different one")
        }

        const existingEmail = await UserModel.findOne({email: email}).exec()

        if (existingEmail) {
            throw Error("A user with this email account already exists, please sign in.")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10)

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        })

        res.status(201).json(newUser)
        
    } catch (error) {
        next(error)
    }
}