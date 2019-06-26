const LocalStrategy = require('passport-local').Strategy,
      passport      = require('passport'),
      Client        = require('../models/client'), 
      express       = require('express'),
      session       = require('express-session'),
      flash         = require('express-flash'),
      cookieParser  = require('cookie-parser'),
      router        = express.Router();

passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());
// router.use(cookieParser('secret'));
// router.use(sessiont({
//     secret: "<secret string here>",
//     resave: false,
//     saveUninitialize: true
// }));
// router.use(flash());

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
            req.flash('error', 'There is already a user with that username!');
            res.locals.message = req.flash();
            return res.render('register');
        }
        passport.authenticate("local", (_err, client) => {
            if (_err) {
                console.log(_err);
                res.render('register');
            }
        });
        req.flash('success', 'Successfully registered!');
        res.locals.message = req.flash();
        res.render('register');
    });
});

// HOME PAGE - REQUIRES LOGIN
router.get("/home", (req, res) => {
    let client = req.user;
    res.render('home', { client: client });
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