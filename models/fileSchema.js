const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema ({
    fileName :{
      type: String,
      required: [true,'file name field is required']  
    } 
});

const File = mongoose.model('file',fileSchema);

module.exports = File;