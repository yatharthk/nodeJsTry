const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

var UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email  value is required'],
        unique:true,
        validate:[isEmail,'Please enter a valid email'],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'Password cannot be empty'],
        minlength:[6,'Password should be min 6 characters'],
    }
    
});

UserSchema.pre('save',async function(next){

    const salt=await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    console.log(`User about to be created ${this}`);
    next();
})

UserSchema.post('save', async function(data,next){
    console.log('User value saved to database is'+data);
    next();
});


//static method for login user
UserSchema.statics.login=async function(email,password){
const user=await User.findOne({email:email});
if(user){
    var auth=await bcrypt.compare(password,user.password);
    console.log("passwords matching?"+Object.values(auth));
   if(auth){//bcrypt auutomatically hashes the unhashed password
    return user;
}
else{
    throw Error('Incorrect password');
}
}
else{
    throw Error('Incorrect email');
}
}

const User=mongoose.model('User',UserSchema);

module.exports=User;