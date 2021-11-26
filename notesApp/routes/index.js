var express = require('express');
var router = express.Router();
var controller=require('../Controller/controller');

// var data=[
//   {notesId: 7558, name: 'Mathan' ,data: 'Mongo Atlas is very easy to configure and use.',},
//   {notesId: 1234,name: 'Yatharth',  data: 'Mongo Compass Community is very easy to use.',},
//   {notesId: 5678,name: 'Shubhi',  data: 'This is dummy note.',},
//   {notesId: 9101,name: 'Shubhi',  data: 'This is dummy note 123.',},
// ];

/* GET home page. */
router.get('/',controller.loadContent);

router.get('/notes',controller.getNotes);

// router.post('/notes',(req,res)=>{
//   data.push(req.body);
//   // console.log(req.body);
//   console.log(data);
//   res.json(data);
//   // next();
// });
router.post('/notes',controller.newNotes);

// router.delete('/notes/:id',(req,res)=>{
//   var newData=data.filter(function(data){

//       let v1= data.notesId.toString()!==req.params.id;
//       console.log(`${data.notesId}!==${req.params.id} == ${v1} `);
//       return v1;
//   });
//   data=newData;
//   res.json(data);
// });
router.delete('/notes/:id',controller.deleteNotes);

router.put('/notes',controller.updateNotes);

module.exports = router;
