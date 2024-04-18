import { InferSchemaType, model, Schema } from "mongoose"

const bookShelf = new Schema({
    title: {type: String, required: true },
    text: { type: String },
}, { timestamps: true})

type Novel = InferSchemaType<typeof bookShelf>

export default model<Novel>("Novel", bookShelf)