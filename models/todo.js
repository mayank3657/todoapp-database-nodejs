const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});
const ToDo=mongoose.model('ToDo',todoSchema);
module.exports=ToDo;