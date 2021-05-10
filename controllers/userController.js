import express from "express";
import session from 'express-session';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/Users.js';
import config from '../config.js';
import { checkEmail, checkNumber, checkString } from '../utils/validator.js';

export const getAll = (req,res) => {

    User.find({}, (err,result) => {
        if(err) return res.status(500).send("Error")
        res.status(200).send(result)
    })
}

export const register = (req,res) =>{
    console.log(req.body)
    User.findOne({email: req.body.email}, (err, result) => {
        if(err) throw err;
        if(result && result.email) {
            return res.status(409).send({"auth": false, "error": "User Already Exist"})
        }else {
            const hashedPass = bcrypt.hashSync(req.body.password,8)
            const status = req.body.isActive;

            const IsValidUserEmail = checkEmail(req.body.email);
            if(!IsValidUserEmail){
                return res.send("Invalid Email")
            }

            const IsValidPhone = checkNumber(req.body.phone);
            if(!IsValidPhone){
                return res.send("Invalid Phone")
            }

            let toBool = (status) => {
                if(status === 'true'){
                    return status= true
                }
                else{
                    return status = false
                }

            }
            User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hashedPass,
                isActive: status?status:true,	
                imageUrl: req.body.image? req.body.image:'https://img.icons8.com/bubbles/100/000000/user.png',	
                phone:req.body.phone,	
                address:req.body.address,
                city:req.body.city,

            }, (err,result) => {
                if(err) return res.status(500),send('Error')
                return res.status(200).send({ "auth": true, "message": "Registration successful" })
            })
        }
    })
}

export const login = (req,res) => {
    User.findOne({email:req.body.email}, (err,result) =>{
        console.log("Inside login")
        if(err) return res.status(500).send({auth:false,"err":"Error while loging In"})
        if(!result) return res.status(500).send({auth:false,"err":"No User found,please resgister"})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,result.password)
            if(!passIsValid) return res.status(500).send({auth:false,"err":"Invalid Password"})
            const token = jwt.sign({id:result._id},config.secret,{expiresIn:86400})
            req.session.user = result
            console.log(req.session.user)
            req.session.save();
            res.send({auth:true,token:token})
        }
    })
}

export const profile = (req,res) =>{
    const token = req.headers['x-access-token'];
    if(!token) return res.status(500).send({auth:false, "err": "No token given"})
    jwt.verify(token,config.secret, (err,data) => {
        if(err) return res.status(500).send({auth:false,"err":"Invalid Token"})
        User.findById(data.id,{password:0}, (err,result) => {
            if(err) return res.status(500).send({auth:false,"err":"No user found"})
            // console.log(result)
            res.status(200).send(result)
        })
    })
}

export const profileById = (req,res) =>{

    const Id = req.params.id
    User.findById(Id, (err,result) => {
        if(err) return res.status(500).send({"err":"Error while fetching the data"})
        if(!result) return res.status(500).send({"err":"No data found"})
        res.status(200).send(result)
    })
}

export const updateUser = (req,res) => {

    const Id = req.params.id
    const status = req.body.isActive;
    let toBool = (status) => {
        if(status === 'true'){
            return status= true
         }
         else{
             return status = false
         }

    }
    User.updateOne({_id:Id},
        {
            $set:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                isActive: status?status:true,	
                imageUrl: req.body.image? req.body.image:'https://img.icons8.com/bubbles/100/000000/user.png',	
                phone:req.body.phone,	
                address:req.body.address,
                city:req.body.city,

            }
        }
        , (err,result) => {
        if(err) return res.status(500).send({"err":"Error while updating the user"})
        res.status(200).send(result)
    })
}

export const deleteUser = (req,res) => {
 
    const Id = req.params.id
    User.deleteOne({_id:Id},(err,result) =>{
        if(err) return res.status(500).send({"err":"Error while deleting the user"})
        res.status(200).send("One data is deleted")
    })
}