const express = require ('express');
const router = express.Router();
const User = require ('../models/userSchema');
const passport = require ('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('..config/passport')(passport);

// get a list of users from the db
router.get('/users', passport.authenticate('jwt',{session:false}), (req, res) => {
    User.find().then((users) => {
        res.send(users);
    });   
});

// get  a user by  id 
router.get('/users/:id', passport.authenticate('jwt',{session:false}), (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.send(user);
    });   
});

// add new user to the db
router.post('/users', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    var user = new User(req.body);
    user.save();
    res.send(user);       
});

//update a user in the db
router.put('/users/:id', passport.authenticate('jwt',{session:false}), (req, res, next) => { 
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        User.findOne({_id: req.params.id}).then((user) => {
            res.send(user);
        });   
    });
});

//delete a user from the db
router.delete('/users/:id', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id}).then((user) => {
        res.send({message: 'user has been removed successfully!!'});
    });
});

//affecter un id de todo dans user
router.post('/affect-todo-to-user/:idUser/:idTodo', passport.authenticate('jwt',{session:false}), (req,res) =>{
    User.findByIdAndUpdate({_id: req.params.idUser}, {$push: {todos : req.params.idTodo}}).then(() => {
        User.findOne({_id: req.params.idUser}).then((user) => {
            res.send(user);
        });   
    });
});

// enlever un todo existant dans le tableau todos d’un user
router.put('/enlever-todo-from-user/:idUser/:idTodo', passport.authenticate('jwt',{session:false}), (req,res) =>{
    User.findByIdAndUpdate({_id: req.params.idUser}, {$pull: {todos : req.params.idTodo}}).then(() => {
        User.findOne({_id: req.params.idUser}).then((user) => {
            res.send(user);
        });   
    });
});

// populate
router.get("/getusers", passport.authenticate('jwt',{session:false}), (req, res) =>{
    User.find({}).populate('todos').exec().then((user)=>{
        res.send(user);
    });
});

//Register
router.post('/register', (req, res) =>{
    let newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        todos: []
    });
    bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err){
                res.json({success: false, msg:'Failed to register user'});
            }else{
                newUser.password = hash;
                newUser.save();
                res.json({success: true, msg: 'User registered'});
            }
        });
    });
});



//login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = {username: username}
    User.findOne(query).then((user)=> {
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch){
                const token = jwt.sign(user.toJSON(), 'abcd', {
                    expiresIn: 604800 //1 week
                });
    
                res.json({
                    success: true,
                    token :  token
                });
            }else{
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });
      
    });
});

//profile
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res) => {
    res.json({user: req.user})
});



module.exports= router;