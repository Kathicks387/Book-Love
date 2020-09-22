//setting server and establishing express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//imports index router to server
const indexRouter = require('./routes/index');

//sets view engine and views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//sets and uses layout files
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

//sets public file
app.use(express.static('public'));

//imports mongooose
const mongoose = require('mongoose');

//establishes connection to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/booklovedb", { useNewUrlParser: true });

//determines if we are logged into database
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'))

//tells app to use indexRouter
app.use('/', indexRouter);


//sets app to listen on port
app.listen(process.env.PORT || 3000);

