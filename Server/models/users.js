import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password: String,
    items: [{
        title: String,
        content: String
    }]
});

const User = mongoose.model("User",userSchema);



export default User;