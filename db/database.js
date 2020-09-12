const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1:27017/mydatabase';
mongoose.connect(mongoDB, { useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports= db;