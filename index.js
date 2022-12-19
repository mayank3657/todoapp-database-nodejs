const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const ToDo=require('./models/todo');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.get('/',function(req,res){
    ToDo.find({},function(err,todo){
        if(err){
            console.log('Error in fetching todo from db');
            return;
        }
        return res.render('home',{
            title:"todo app",
            todo_app:todo
        });
    });
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"hello"
    });
})
app.post('/create-todo',function(req,res){
    ToDo.create({
        task:req.body.task,
        date:req.body.date
    },function(err,newtodo){
        if(err){
            console.log('error in creating a todo');
            return;
        }
        console.log('****',newtodo);
        return res.redirect('back');
    });
});
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    ToDo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup my express server is up and running on port',port);
});