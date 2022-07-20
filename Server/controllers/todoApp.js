import User from "../models/users.js";
import * as vl from "../validators/users.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function getUsers (req,res){
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

async function createUser(req,res){
    const user = req.body;
    if(vl.registerValidator(user, await User.find())){
        bcrypt.hash(user.password,saltRounds,(err,hash) => {
            if(err){
                res.status(500).json({message: err.message});
            }
            else{
                const newUser = new User({...user, password: hash});
                newUser.save((err)=>{
                    if(err){
                        res.status(500).json({message: err.message});
                    }
                    else{
                        res.status(201).json({message: "User Regsitered"});
                    }
                });
            }
        });
    }
    else{
        res.status(409).json({message: "usuario invalido"});
    }
}

async function getUser(req,res){
    const user = req.body;
    User.findOne({email: user.email}, (err,foundUser)=>{
        if(err){
            res.status(500).json({message: err.message});
        }
        else{
            if(foundUser){
                bcrypt.compare(user.password,foundUser.password,(err,result)=>{
                    if(err){
                        res.status(500).json({message: err.message});
                    }
                    else{
                        if(result === true){
                            res.status(200).json({message: "validate User"});
                        }
                        else{
                            res.status(500).json({message: "Invalid User"});
                        }
                    }
                });
            }
            else{
                res.status(409).json({message: "User Not Exist"});
            }
        }
    }
    )
}

async function patchItem(req,res){
    User.updateOne({email:req.params.email},
         {$set:req.body},
        function(err){
            if(err){
                 res.status(500).json({message: err.message});
            }
            else{
                res.status(201).json({message: "Suscefully updated"});
            }
        });
}

async function getItems(req,res){
    User.findOne({email:req.params.email},(err,foundUser) => {
        if(err){
            res.status(500).json({message: err.message});
        }
        else{
            if(foundUser){
                res.status(200).json(foundUser.items);
            }
            else{
                res.status(409).json({message: "user doesnt exist"});
            }
        }
    });
}

async function deleteItem(req,res){
    User.updateOne({ email: req.params.email }, { "$pull": { "items": { "_id": req.params.id } }}, { safe: true, multi:true }, function(err, obj) {
        if(err){
            res.status(500).json({message: err.message});
        }
        else{
            res.status(200).json({message: "deleted"});
        }
    });
}

export {getUsers, createUser, getUser, patchItem, getItems, deleteItem};