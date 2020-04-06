const mongoose = require('mongoose');

const moviePofessionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  actor:{
    type: Boolean,
    required: true
  },
  writer:{
    type: Boolean,
    required: true
  },
  director:{
    type: Boolean,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  born: { 
    type: String,
    required:true
  }
});


  //default: Date.now
const MoviePofessional = mongoose.model('moviePofessional', moviePofessionalSchema);

module.exports = MoviePofessional;
