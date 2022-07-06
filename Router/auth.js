const express = require('express');
const {body,validationChecker}=require('express-validator')
var { expressjwt: jwt } = require("express-jwt");

const router = express.Router();
const {errorHandler}=require('../helpers/dbErrorHandler')

const {signup , signin, signout, requireSignin}=require('../Controllers/auth');
const {userSignupValidator}=require('../Validator/validation')
const User = require('../models/user')


router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get('/products',jwt({ secret: process.env.SECURITY_KEY, algorithms: ["HS256"] }),(req,res)=>{
//         console.log(req.auth);
//         if(!req.auth) return res.status(401).json({
//             message:"Not authorized to access this page"
//         })
//         res.json({
//             status:"valid user",
//             name:"Rohit"
//         })
// })

// router.get('/product',requireSignin,(req,res)=>{
    
//     res.json({
//         status:"valid user",
//         name:"Rohit"
//     })
// })

module.exports=router;