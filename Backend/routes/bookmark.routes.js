const express = require("express")
const bookmarkController = express.Router()
const BookmarkModel = require("../models/bookmark.model")


bookmarkController.post("/create", async (req, res)=>{
    const {userId,title, quantity, priority,date_and_timeStamp, description } = req.body
    const newbookmark = await new BookmarkModel({
        userId,title, quantity, priority,date_and_timeStamp, description
    })
    await newbookmark.save()
    res.send({Message:"bookmark created",newbookmark})
})

bookmarkController.get("/", async (req, res)=>{
    const {userId} = req.body
    console.log(req.params)
    const user = await BookmarkModel.find({userId})
    if(user){
        console.log((user))
        return res.send({
            message:"Get request successful",
            bookmark:user
        })
    }
    else{
        return res.send("Please create some bookmark")
    }
})

bookmarkController.delete("/:bookmarkId/delete", async (req, res)=>{
    const {bookmarkId} = req.params
    const {userId} = req.body
    const details = await BookmarkModel.findOne({_id:bookmarkId})
    if(details.userId === userId){
        const newBookmark = await BookmarkModel.findOneAndDelete({_id:bookmarkId})
        res.status(200).send({message:"deleted successfully"})
    } 
    else{
        res.status(400).send({message:"You are not authorized"})
    }
})

module.exports = bookmarkController