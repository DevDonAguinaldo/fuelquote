// DEPENDENCIES
const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose');

// SCHEMAS
var ClientSchema = new mongoose.Schema({
    newAcc: { type: Boolean, default: true },
    username: String,
    name: String,
    password: String,
    email: String
});

ClientSchema.plugin(passportLocalMongoose); // allows passport to recognize schema to pass to db

module.exports = mongoose.model("Client", ClientSchema); // export to other js