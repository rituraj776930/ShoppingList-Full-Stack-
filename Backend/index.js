require('dotenv').config()
const express = require('express')
const server = express()
const connection = require('./db')
const userController = require("./routes/user.routes")
const authentication = require('./middlewares/authentication')
const notesController = require('./routes/notes.routes')
const cors = require('cors')
const bookmarkController = require('./routes/bookmark.routes')
server.use(express.json())
server.use(cors())

server.use("/user", userController)
server.use(authentication)
server.use("/notes", notesController)
server.use("/bookmark", bookmarkController)







server.listen(process.env.PORT, async ()=>{
    try {
        await connection
        console.log('db connected')
    } catch (error) {
        console.log("error in connecting db")
        console.log(error)
    }
})