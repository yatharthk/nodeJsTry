
var model=require('../Model/model');
// var data=require('../Model/model');

var notesModel=model.notesModel;
var data= model.data;
exports.loadContent=async(req,res)=>{
    try{
        res.render('index.ejs');
        const newNotes = await notesModel.create(data);
        console.log(newNotes);
        
    }
    catch(err){
        console.log(err);
        // next(err);
    }
    // next();
};

exports.getNotes=async(req,res)=>{
    notesModel.find({},(err,data)=>{
        console.log('Notes List refreshing..')
    res.render('notesPage.ejs',{notes:data});
    
  });
}

exports.newNotes=async(req,res)=>{
    try{
        var newNote= await notesModel(req.body).save(function(err,data){
            if(err) throw err;
            res.json(req.body);
        });
    }
    catch(err){
        console.log(err);
        // next(err);
    }
}

exports.updateNotes=async(req,res)=>{
    console.log(req.body.notesId);
    await notesModel.findOneAndUpdate({notesId:req.body.notesId},req.body,{new:true});

}

exports.deleteNotes=async(req,res,err)=>{
   var id=req.body.notesId;
    // var deletedNote=notesModel.find({data:req.params.id});
    var deletedNote=await notesModel.find({notesId:req.params.id}).deleteOne((err,data)=>{
        if(err) throw err;
        res.json({notes:data});
    });
    console.log(`deletedNode with id: ${req.params.id}`);
    
}
