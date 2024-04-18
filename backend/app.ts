import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import NovelModel from "./models/Novel"

const app = express()

app.get("/", async (req, res, next) => {
    try {
        const novels = await NovelModel.find().exec();
        res.status(200).json(novels);
    } catch (error) {
        next(error)
    }
})

app.use((req, res, next) => {
    next(Error("Endpoint not found"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) errorMessage = error.message
    res.status(500).json({ error: errorMessage })
})
export default app
 