import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userModel);
export default User;