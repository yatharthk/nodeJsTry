const mongoose=require('mongoose');

mongoose.connect('mongodb://192.168.1.8:27017/notes',{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true,useCreateIndex:true});

var data=[
    {notesId: 7558, name: 'Mathan' ,data: 'Mongo Atlas is very easy to configure and use.',},
    {notesId: 1234,name: 'Yatharth',  data: 'Mongo Compass Community is very easy to use.',},
    {notesId: 5678,name: 'Priya',  data: 'This is dummy note.',},
    {notesId: 9101,name: 'Shubhi',  data: 'This is dummy note 123.',},
  ];

var notesSchema=new mongoose.Schema(
    {
        notesId:{
            type:Number,
            required:[true,'Required Field'],
            unique:true,
            },

        name:{type:String,
            required:[true,'Required Field'],
            },
            
        data:{
            type:String},
    });


var notesModel=mongoose.model('notes',notesSchema);

module.exports.notesModel=notesModel;
module.exports.data=data;