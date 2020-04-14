const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    description: String,
    rating: { type: Number, default: 0 },
    voteNum: { type: Number, default: 0 },
    runtime : Number,
    releaseYear : Number,
    professionals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "moviePofessional"
    }]
}, {
    timestamps: true
});

MovieSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Movie', MovieSchema);