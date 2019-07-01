const LocalStrategy = require('passport-local').Strategy,
      passport      = require('passport'),
      Client        = require('../models/client'),
      express       = require('express'),
      router        = express.Router();

passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());      

router.get("/", (req, res) => { res.render('landing'); });

// LOGIN PAGE
router.get("/login", (req, res) => { res.render('login'); });

// LOGIN PAGE - AUTHENTICATE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/clients/home",
    failureRedirect: "/login",
    failureFlash: true
}));

// CLIENT REGISTRATION PAGE
router.get("/register", (req, res) => { res.render('register'); });

// CLIENT REGISTRATION PAGE - POST
router.post("/register", (req, res) => {
    let newClient = new Client({ 
        newAcc: true,
        username: req.body.registerusername,
        datecreate: Date()
    });
    
    if (req.body.registerpassword === req.body.confirmpassword) {
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
    } else {
        req.flash('error', 'Passwords do not match!');
        res.locals.message = req.flash();
        res.render('register');
    }
});

module.exports = router;