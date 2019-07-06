// DEPENDENCIES
const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose'),
      Quote                 = require('../models/quote');

// SCHEMA
const ClientSchema = new mongoose.Schema({
    newAcc: {
        type: Boolean,
        default: true
    },
    name: String,
    username: String,
    dateCreated: { 
        type: String,
        default: Date()
    },
    password: String,
    email: String,
    address: String,
    address2: {
        type: String,
        default: "N/A",
    },
    quoteHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote"
    }]
});

ClientSchema.plugin(passportLocalMongoose); // allows passport to recognize schema to pass to db

module.exports = mongoose.model("Client", ClientSchema); // export to other js