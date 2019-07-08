const LocalStrategy = require('passport-local').Strategy,
      passport      = require('passport'),mongoose = require('mongoose'),
      express       = require('express'),
      router        = express.Router(),
      Client        = require('../models/client'),
      Quote         = require('../models/quote');

// HOME PAGE - REQUIRES LOGIN
router.get("/home", (req, res) => {
    if (req.user.newAcc === true) {
        res.render('manage', { client: req.user });
    } else {
        Client.findById(req.user._id).populate('quoteHistory').exec((err, client) => {
            if(err) {
                console.log(err);
                res.redirect('/clients/home');
            } else {
                res.render('home', {
                    client: client,
                    quotes: client.quoteHistory
                });
            }
        });
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
            console.log("Updated " + client.username + "'s info in database.");
            client.save();
        }
    });
    req.user = clientData;

    res.render('home', { client: req.user });
});

// GET A QUOTE
router.get("/home/getaquote", (req, res) => {
    res.render('getaquote', { client: req.user });
});

router.post("/home/getaquote", (req, res) => {
    Client.findById(req.user._id, (err, client) => {
        if(err) {
            console.log(err);
            var message_error = {
                type: 'error',
                messageHeader: 'An error has occurred!',
                messageBody: err + '.'
            };
            res.render('getaquote', {
                client: req.user,
                message: message_error
            });
        } else {
            Quote.create(req.body.quote, (err, quote) => {
                if(err) {
                    console.log(err);
                    res.redirect('/clients/home/getaquote');
                } else {
                    client.quoteHistory.push(quote);
                    client.save();
                    quote.save();
                    res.render('home', { client: client });
                }
            });
        }
    });
});

router.get('/home/quotehistory', (req, res) => {
    Client.findById(req.user._id).populate('quoteHistory').exec((err, client) => {
        if(err) {
            console.log(err);
            res.redirect('/clients/home');
        } else {
            console.log('Successfully queried database for quote history.');
            res.render('quotehistory', {
                client: client,
                quotes: client.quoteHistory
            });
        }
    });
});

// LOGOUT 
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;