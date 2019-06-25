// DEPENDENCIES
const express               = require('express'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      PORT                  = process.env.PORT || 3030;

// MIDDLEWARE
mongoose.connect('mongodb+srv://daguinaldo:Jasmine3@fuelquote-clients-ntojl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected to client database - mongodb atlas");
}).catch(err => {
    console.log('ERROR:', err.message);
}); // mongodb connection

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));

// SERVER RESPONSE
app.listen(PORT, () => { console.log('FuelQuote server listening on port', PORT) });
