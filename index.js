const express = require('express');
const routes = require('./routes/userApi');
const routesTodo = require('./routes/todoApi');
const db = require('./db/database');
const bodyParser = require('body-parser');
const email = require("./routes/email");
const image = require('./routes/imageApi');
const run = require("./routes/run");
const passport = require ('passport');
require('..config/passport')(passport)

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:false}))
app.use (bodyParser.json ());


app.use('/api', routes);
app.use('/api', routesTodo);
app.use("/api",email);
app.use('/api',image);
app.use("/api",run);




app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});