// DEPENDENCIES
const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose');

// SCHEMA
const QuoteSchema = new mongoose.Schema({
    dateCreated: {
        type: String,
        default: Date()
    },
    quotePrice: {
        type: Number.toFixed(2),
        default: 0.0
    }
});

QuoteSchema.plugin(passportLocalMongoose); // allows passport to recognize schema to pass to db

module.exports = mongoose.model("Quote", QuoteSchema); // export to other js