// DEPENDENCIES
const express               = require('express'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      Client                = require('./models/client'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

// MIDDLEWARE
mongoose.set('useNewUrlParser', true); 
mongoose.connect('mongodb+srv://daguinal:#Jasmine3@fuelquote-clients-ntojl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected to client database - mongodb atlas");
}).catch(err => {
    console.log('ERROR:', err.message);
}); // mongo connection
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

// ROUTES
app.get("/", async (req, res) => {
    res.redirect('login');
});

// CLIENT REGISTRATION PAGE
app.get("/register", (req, res) => {
    res.render('register');
});

// CLIENT REGISTRATION PAGE - POST
app.post("/register", (req, res) => {
    Client.register(new Client({
        username: req.body.registerusername,
        name: `${req.body.registerfirstname} ${req.body.registerlastname}`,
        email: req.body.registeremail
    }), req.body.registerpassword, (err, client) => {
        if (err) {
            console.log(err);
            return res.render('register');
        } 
        passport.authenticate("local")(req, res, function() {
            res.redirect('/home');
        });
        res.redirect("/login");
    });
});

// HOME PAGE - REQUIRES LOGIN
app.get("/home", (req, res) => {
    res.render('home');
});

// LOGIN PAGE
app.get("/login", (req, res) => {
    res.render('login');
});

// LOGIN PAGE - AUTHENTICATE
app.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}), (req, res) => {});

// LOGOUT 
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
});

// SERVER RESPONSE
app.listen(3030, () => {
    console.log('FuelQuote server listening on port 3030');
});
