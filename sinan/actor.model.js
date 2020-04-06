const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
    name: String,
    surname: String,
    movies: [String],
    rating: double,
    awards: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Actor', actorSchema);