import express from 'express'
// APP SETUP
const app = express()
const port = 5000

// ENDPOINTS
app.get("/", (req, res) => {
    res.send("I'm Awake")
})

// STARTING SERVER
app.listen(port, () => {
    console.log("Server running on port:" + port)
})