import mongoose, { Schema } from "mongoose";

const noteModel = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
}, { timestamps: true });

const Note = mongoose.models.Notes || mongoose.model("Notes", noteModel);

export default Note;