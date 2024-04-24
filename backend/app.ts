import "dotenv/config"
import session from "express-session"
import MongoStore from "connect-mongo"
import userRoutes from "./routes/Users"
import novelsRoutes from "./routes/novels"
import { requiresAuth } from "./middleware/authMiddleware"
import cors from "cors"
import express, { json, NextFunction, Request, Response } from 'express'
import { router as bookshelfRouter } from "./controllers/bookShelf"
import searchRouter from './routes/search';

const app = express()

// Middleware to parse json bodies
app.use(express.json())
// Middleware
app.use(cors());

// Configure session middleware
const sessionSecret = process.env.SESSION_SECRET; // Retrieve SESSION_SECRET from environment variables

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is missing in environment variables');
}

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // This is one hour
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING || '', // Provide a fallback value for MongoDB connection string
  })
}));


app.use("/api/users", userRoutes)
app.use("/api/novels", requiresAuth, novelsRoutes)
app.use('/bookshelf', requiresAuth, bookshelfRouter)
app.use('/api/search', searchRouter)

app.use((req, res, next) => {
  next(new Error("Endpoint not found"));
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(404).send(err.message || 'Not Found');
});

export default app
 
