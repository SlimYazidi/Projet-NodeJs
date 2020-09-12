const express = require('express');
const routerTodo = express.Router();
const Todo = require('../models/todoSchema');


routerTodo.get('/todo', (req, res) => {
    Todo.find().then((todo) => {
        res.send(todo);
    });   
});

 
routerTodo.get('/todo/:id', (req, res) => {
    Todo.findById(req.params.id).then((todo) => {
        res.send(todo);
    });   
});


routerTodo.post('/todo', (req, res, next) => {
    var todo = new Todo(req.body);
    todo.save();
    res.send(todo);       
});


routerTodo.put('/todo/:id', (req, res, next) => { 
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Todo.findOne({_id: req.params.id}).then((todo) => {
            res.send(todo);
        });   
    });
});


routerTodo.delete('/todo/:id', (req, res, next) => {
    Todo.findByIdAndRemove({_id: req.params.id}).then((todo) => {
        res.send({message: 'todo has been removed successfully!!'});
    });
});

module.exports= routerTodo;