import { Schema } from "mongoose"

const userSchema = new Schema ({
    username: { type: String, required: true},
    email: { type: String, required: true, select: false},
    password: { type: String, required: true, select: false},
})