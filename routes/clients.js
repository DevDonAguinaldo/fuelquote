const LocalStrategy = require('passport-local').Strategy,
      passport      = require('passport'),
      Client        = require('../models/client'), 
      express       = require('express'),
      router        = express.Router();

passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

// CLIENT REGISTRATION PAGE
router.get("/register", (req, res) => {
    res.render('register');
});

// CLIENT REGISTRATION PAGE - POST
router.post("/register", (req, res) => {
    let newClient = new Client({ username: req.body.registerusername });
    
    Client.register(newClient, req.body.registerpassword, (err, client) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local", (_err, client) => {
            if (_err) {
                console.log(_err);
                res.render('register');
            }
        });
        res.redirect('/');
    });
});

// HOME PAGE - REQUIRES LOGIN
router.get("/home", (req, res) => {
    res.render('home');
});

// LOGIN PAGE
router.get("/login", (req, res) => {
    res.render('login');
});

// LOGIN PAGE - AUTHENTICATE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/clients/home",
    failureRedirect: "/clients/login"
}), (req, res) => {});

// LOGOUT 
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/clients/login');
});

module.exports = router;