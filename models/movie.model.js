const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    voteNum: Number,
    runtime : Number,
    releaseDate : Date,
    professionals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "moviePofessional"
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Movie', MovieSchema);