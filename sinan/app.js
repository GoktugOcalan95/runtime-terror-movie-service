const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//db
const dbConfig = require("./db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Middleware
app.use('/user', () => {
    console.log("User added.");
});
//

app.get('/', (req,res) => {
    res.send("User Home");
});

require('./user.routes')(app);

app.listen(3000, () => {
    console.log("Server is listening to port 3000. \n");
});

