const express = require("express")
const notesController = express.Router()
const NotesModel = require("../models/notes.model")


notesController.post("/create", async (req, res)=>{
    const {userId,title, quantity, priority,date_and_timeStamp, description } = req.body
    const newNotes = await new NotesModel({
        userId,title, quantity, priority,date_and_timeStamp, description
    })
    await newNotes.save()
    res.send({Message:"notes created",newNotes})
})

notesController.get("/", async (req, res)=>{
    const {userId} = req.body
    console.log(req.params)
    const user = await NotesModel.find({userId})
    if(user){
        console.log((user))
        return res.send({
            message:"Get request successful",
            notes:user
        })
    }
    else{
        return res.send("Please create some Notes")
    }
})

notesController.delete("/:notesId/delete", async (req, res)=>{
    const {notesId} = req.params
    const {userId} = req.body
    const details = await NotesModel.findOne({_id:notesId})
    if(details.userId === userId){
        const newNotes = await NotesModel.findOneAndDelete({_id:notesId})
        res.status(200).send({message:"deleted successfully"})
    } 
    else{
        res.status(400).send({message:"You are not authorized"})
    }
})

module.exports = notesController
