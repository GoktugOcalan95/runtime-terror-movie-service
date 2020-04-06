const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  movieid:{
    type: String,
    required: true
  },
  bookmarkid:{
    type: String,
    required: true
  }
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;
