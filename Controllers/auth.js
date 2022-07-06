const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
var { expressjwt: expjwt } = require("express-jwt");

const { errorHandler } = require('../helpers/dbErrorHandler');

// using promise
exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    let user
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'

            })

        }
        if(!user.authenticate(password)){
             return res.status('401').json({
                error: 'Email and password dont match'
            })
        }
        // creating jwt token
        const userid={_id:user._id}
        const token=jwt.sign(userid,process.env.SECURITY_KEY);
        res.cookie('t',token,{expire:new Date()+ 9999});
        res.json({
            user:user,
            token:token
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin=(req,res,next)=>{
    expjwt({ secret: process.env.SECURITY_KEY, algorithms: ["HS256"]});
    console.log(req.auth);
    if (!req.auth) return res.sendStatus(401);
    res.sendStatus(200);
    next();
}


exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

exports.isAuth=(req,res,next)=>{
    const Bearer=req.header('authorization');
    if(Bearer){
        const bearerArray=Bearer.split(' ');
        const token=bearerArray[1];
        
        jwt.verify(token,process.env.SECURITY_KEY,(err,user)=>{
            
            
            if(err){
                console.log("inside the error");
               return  res.status(401).json({
                    error:"Unauthorized user"
                })
            }
           let obj=req.profile._id;
           let newId=obj.toHexString();
           
            
            
            
            if(user._id!==newId){
               return res.status(401).json({
                    message:"Not Authorized user"
                })
            }
            
            next();
        });
    }
    else{
        return res.status(401).json({
            msg:"invalid user"
        
        })
        next();

}
    
}





