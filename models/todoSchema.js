const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    title:{
        type: String,
        required: [true,'title field is required']
    },
    description:{
        type: String,
        required: [true,'discription field is required']
    },
});

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;