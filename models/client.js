// DEPENDENCIES
const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose');

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
    quoteHistory: []
});

ClientSchema.plugin(passportLocalMongoose); // allows passport to recognize schema to pass to db

module.exports = mongoose.model("Client", ClientSchema); // export to other js