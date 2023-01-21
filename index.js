const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const authentication = require("./middlewares/authentication")
const userController = require("./routes/user.routes")


require('dotenv').config()


const app = express() 
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Home page")
})

app.use("/user", userController)


app.listen(process.env.PORT, async () => {
    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log(err)
        console.log("error occur in catch statement")
    }
    console.log(`Listning on port ${process.env.PORT}`)
})