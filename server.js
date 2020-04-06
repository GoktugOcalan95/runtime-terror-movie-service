const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api/users', require('./controllers/user.controller'));
app.use('/api/movies', require('./controllers/movie.controller'));
app.use('/api/home', require('./controllers/home.controller'));
app.use('/api/search', require('./controllers/search.controller'));
app.use('/api/professionals', require('./controllers/professional.controller'));

//app.use('/api/mp', require('./routes/api/moviePofessional'));
//app.use('/api/lp', require('./routes/api/moviePofessional'));
//app.use('/api/rm', require('./routes/api/reviewMovies'));
//app.use('/api/wl', require('./routes/api/watchlist'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

// connect to database
const connectDB = require('./config/connectDB');
connectDB();