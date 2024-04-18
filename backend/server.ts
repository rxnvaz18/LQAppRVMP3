import app from "./app"
import mongoose from "mongoose"


// APP SETUP
const port = process.env.PORT

// MONGOOSE CONNECTION & STARTING SERVER
mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
.then(()=> {
    console.log("Mongoose Connected")
    app.listen(port, () => {
    console.log("Server running on port:" + port)
    })
})
.catch(console.error)

