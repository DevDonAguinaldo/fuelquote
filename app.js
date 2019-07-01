// DEPENDENCIES
const express               = require('express'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      flash                 = require('connect-flash'),
      cookieParser          = require('cookie-parser'),
      URL                   = process.env.MONGODB_URI || "mongodb://localhost/clientinfo",
      PORT                  = process.env.PORT || 3030;

// MIDDLEWARE
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to client database on MongoDB Atlas server.");
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
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('secret'));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ROUTES
app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));

// SERVER RESPONSE
app.listen(PORT, () => { console.log('FuelQuote server listening on port ' + PORT + '.') });
