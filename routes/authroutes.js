const express=require('express');
const router=express.Router();
const controller=require('../controller/authController');

router.get('/signup',controller.get_SignUp);
router.post('/signup',controller.post_SignUp);
router.get('/login',controller.get_Login);
router.post('/login',controller.post_Login);


module.exports=router;