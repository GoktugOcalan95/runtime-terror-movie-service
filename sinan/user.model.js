const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    surname: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);