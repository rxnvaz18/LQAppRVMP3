import { InferSchemaType, model, Schema } from "mongoose"

const novelSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: {type: String, required: true },
    text: { type: String },
}, { timestamps: true})

type Novel = InferSchemaType<typeof novelSchema>

export default model<Novel>("Novel", novelSchema)