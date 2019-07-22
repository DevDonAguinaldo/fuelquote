const LocalStrategy = require('passport-local').Strategy,
      passport      = require('passport'),mongoose = require('mongoose'),
      express       = require('express'),
      price         = require('../js/price.js'),
      Client        = require('../models/client'),
      Quote         = require('../models/quote'),
      router        = express.Router();

// HOME PAGE - REQUIRES LOGIN
router.get("/home", (req, res) => {
    if (req.user.newAcc === true) {
        res.render('manage', { client: req.user });
    } else {
        res.render('home', { client: req.user });
    }
});

// MANAGE 
router.get("/manage", (req, res) => { res.render('manage'); })

router.post("/manage", (req, res) => {
    let clientData = {
        'newAcc': false,
        'username': req.user.username,
        'name': {
            'firstName': req.body.registerfirstname,
            'lastName': req.body.registerlastname
        },
        'email': req.body.registeremail,
        'address': {
            'street': req.body.registerhomeaddress, 
            'city': req.body.registercity, 
            'state': req.body.registerstate, 
            'zipcode': req.body.registerzip,
        },
        'address2': {
            'street': req.body.registerhomeaddress2, 
            'city': req.body.registercity2, 
            'state': req.body.registerstate2, 
            'zipcode': req.body.registerzip2,
        }
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
    message = {
        type: 'success',
        messageHeader: 'You have successfully completed registration!',
        messageBody: 'You may now login and enjoy Fuel Quote.'
    };
    res.render('login', message);
});

// GET A QUOTE
router.get("/home/getaquote", (req, res) => {
    res.render('getaquote', { client: req.user });
});

router.post("/home/getaquote", (req, res) => {
    let newQuote;
    let month = Number((req.body.quote.orderdate).substr(0, 2));
    let suggested = price.getSuggestedPrice(req.user.address.state, month, req.user.quoteHistory, req.body.quote.gallons);
    let total = price.getTotal(req.body.quote.gallons, suggested);

    newQuote = new Quote({
        gallons: req.body.quote.gallons,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zipcode: req.user.address.zipcode     
        },
        orderdate: req.body.quote.orderdate,
        deliverydate: req.body.quote.deliverydate,
        suggestedPrice: suggested,
        total: total,
    });

    res.render('quotedetails', { 
        client: req.user, 
        quote: newQuote
    });
});

// SHOW QUOTE DETAILS
router.get('/home/quotedetails', (req, res) => {
    res.render('quotedetails', { 
        client: req.user,
        quote: []
     });
});

router.post('/home/quotedetails', (req, res) => {
    Client.findById(req.user._id).populate('quoteHistory').exec((err, client) => {
        if(err) {
            console.log(err);
        } else {
            Quote.create(req.body.quote, (err, quote) => {
                if(err) {
                    console.log(err);
                    res.redirect('/clients/home/quotedetails');
                } else {
                    client.quoteHistory.push(quote);
                    quote.save();
                    client.save();
                    res.render('home', {
                        client: client,
                        quotes: client.quoteHistory,
                    });
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