const mongoose = require('mongoose');

const ReviewMoviesSchema = new mongoose.Schema({
    rateid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    movieid: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: false
    },
    reviewdate: {
        type: Date,
        default: Date.now
    }
});

const ReviewMovies = mongoose.model('reviewMovies', ReviewMoviesSchema);

module.exports = ReviewMovies;
