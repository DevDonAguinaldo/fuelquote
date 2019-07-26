// DEPENDENCIES
const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose');

// SCHEMA
const QuoteSchema = new mongoose.Schema({
    gallons: Number,
    address: String,
    orderdate: {
        type: String,
        default: Date
    },
    deliverydate: {
        type: String,
        default: 'N/A'
    },
    suggestedPrice: {
        type: Number,
        default: 0.0
    },
    total: {
        type: Number,
        default: 0.0
    }
});

QuoteSchema.plugin(passportLocalMongoose); // allows passport to recognize schema to pass to db

module.exports = mongoose.model("Quote", QuoteSchema); // export to other js