import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import usersRoutes from "./routes/todoApp.js";

const app = express();



app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api", usersRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/todoDB")
.then(()=>{
    app.listen(PORT,() =>{
        console.log("Server running on port: " + PORT);
    })
})
.catch((error)=>{
    console.log(error.message);
});

