const mongoose = require('mongoose'),
      express  = require('express'),
      router   = express.Router(),
      Client   = require('../models/client');

// HOME PAGE - REQUIRES LOGIN
router.get("/home", (req, res) => {
    if (req.user.newAcc === true) {
        res.render('manage', { client: req.user });
    } else {
        res.render('home', { client: req.user });
    }
});

router.get("/manage", (req, res) => { res.render('manage'); })

router.post("/manage", (req, res) => {
    let clientData = {
        'newAcc': false,
        'username': req.user.username,
        'name': `${req.body.registerfirstname} ${req.body.registerlastname}`,
        'email': req.body.registeremail,
        'address': `${req.body.registerhomeaddress}, ${req.body.registercity}, ${req.body.registerstate}, ${req.body.registerzip}`,
        'address2': `${req.body.registerhomeaddress2}, ${req.body.registercity2}, ${req.body.registerstate2}, ${req.body.registerzip2}`, 
    };

    Client.findByIdAndUpdate(req.user._id, clientData, (err, client) => {
        if (err) {
            console.log(err);
            res.render('manage', { client: req.user });
        } else {
            console.log("updated database");
            message = { type: 'null' };
            res.render('login', message);
        }
    });
});

// GET A QUOTE
router.get("/getaquote", (req, res) => {
    res.render('getaquote', { client: req.user });
});

// LOGOUT 
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;