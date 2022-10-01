const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    title:{type:String,required:true},
    quantity:{type:String,required:true},
    priority:{type:String,required:true},
    description:{type:String,required:true},
    date_and_timeStamp:{type:String,required:true},
    userId:{type:String,required:true}
})
const NotesModel = mongoose.model("note", NotesSchema)

module.exports = NotesModel