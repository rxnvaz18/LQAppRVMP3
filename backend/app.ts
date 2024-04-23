import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import session from "express-session"
import MongoStore from "connect-mongo"
import userRoutes from "./routes/Users"
import novelsRoutes from "./routes/novels"
import bookshelfRoutes from "./routes/bookshelf"
import { requiresAuth } from "./middleware/authMiddleware"

const app = express()

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,  //This is one hour
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING
    })
}))

app.use("/api/users", userRoutes)
app.use("/api/novels", requiresAuth, novelsRoutes)
app.use("/api/bookshelf", requiresAuth, bookshelfRoutes)

app.use((req, res, next) => {
    next(Error("Endpoint not found"))
})

export default app
 
