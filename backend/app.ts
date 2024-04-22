import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import session from "express-session"
import MongoStore from "connect-mongo"
import userRoutes from "./routes/Users"
import novelsRoutes from "./routes/novels"
import bookshelfRoutes from "./routes/bookshelf"
import env from "./util/validateEnv"

const app = express()

app.use(express.json())
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,  //This is one hour
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.REACT_APP_MONGODB_URI
    })
}))

app.use("/api/users", userRoutes)
app.use("/api/novels", novelsRoutes)
app.use("/api/bookshelf", bookshelfRoutes)

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
 