import "dotenv/config"
import mongoose from "mongoose"
import express from 'express'

// APP SETUP
const app = express()
const port = process.env.PORT

// MONGOOSE CONNECTION & STARTING SERVER
mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
.then(()=> {
    console.log("Mongoose Connected")
    app.listen(port, () => {
    console.log("Server running on port:" + port)
    })
})
// ENDPOINTS
app.get("/", (req, res) => {
    res.send("I'm Awake!")
})

