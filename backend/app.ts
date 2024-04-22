import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'

import novelsRoutes from "./routes/novels"
import bookshelfRoutes from "./routes/bookshelf"

const app = express()

app.use(express.json())

app.use("/api/novels", novelsRoutes)
app.use("/api/novels", bookshelfRoutes)

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
 