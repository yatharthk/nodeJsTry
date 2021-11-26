const user=require('../model/user');
const jwt=require('jsonwebtoken');
const User = require('../model/user');
const { response } = require('express');

const maxAge=3*24*60*60;

const createToken= (id)=>{
    return jwt.sign({id},'secretKeyServer',{expiresIn:maxAge});
}


const handleErrors=(err)=>{
    const responseError={email:'',password:''};
    // console.log(err);
    console.log(err.message,err.code);

    //email error
    if(err.message==='Incorrect email'){
        // console.log(err);
        responseError.email='Email id Not registered';
        return responseError;
    }

//password error
if(err.message==='Incorrect password'){
    console.log(err);
    responseError.password='Incorrect password.Please check again';
    return responseError;
}


    if(err.code==11000){
        responseError.email='Email already exists. Please enter a new one';
        return responseError;
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({properties})=>{
            // console.log(error.properties);
            // error.email=somce value
            responseError[properties.path]=properties.message;
        });
        return responseError;
    }

    
    
    
};

module.exports.get_SignUp=async(req,res)=>{
    console.log('Get signup page');
    res.render('SignUp');

}

module.exports.post_SignUp=async(req,res)=>{
    // console.log('Post signup');
    const {email,password}=req.body;
    // console.log("email is "+email+password);

    try{
    const User=await user.create({email:email,password:password});
    const token=createToken(User._id);
    res.cookie('cookie1',token,{httpOnly:true,maxAge:maxAge*1000});
    res.status(201).json({UserObj:User._id});
    }
    catch(err){
        // console.log(err);
       const error=handleErrors(err);
        // res.status(400).send('Error, user not created');\
        res.status(400).json({errors});
    }
}

module.exports.get_Login=async(req,res)=>{
    console.log('get Login Page');
    res.render('login.ejs');
}

module.exports.post_Login=async(req,res)=>{
    let {email,password}=req.body;
    try{
        const user=await User.login(email,password);
        var token=createToken(user._id);
        res.cookie('ljwt',token,{maxAge:maxAge*1000,httpOnly:true});
        res.status(200).json({userObj:user._id});
    }
    catch(err){
        var errors=handleErrors(err);
        res.status(400).json({errors});
    }
}
