const Movie = require('../models/movie.model.js');
const Professional = require('../models/MoviePofessional');

async function create(movieParam) {
    const movie = new Movie(movieParam);
    await movie.save();
}

async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return await Movie.findById(id);
}

async function update(id, movieParam) {
    const movie = await Movie.findById(id);
    if (!movie) throw 'Movie not found';
    Object.assign(movie, movieParam);
    await movie.save();
}

async function _delete(id) {
    await Movie.findByIdAndRemove(id);
}

async function findByYear(year){
    let movies = await Movie.find();
    return movies.filter(m => m.releaseYear == year)
}
async function findByName(title){
    let movies = await Movie.find()
    return movies.filter(m => m.title.indexOf(title) != -1)
}
async function findByRating(rating){
    let movies = await Movie.find()
    return movies.filter(m => m.rating >= Number(rating))
}

async function findByProfessional(id){
    let movies = await Movie.find()
    return movies.filter(m => m.professionals.find(a => a._id == id) != undefined)
}

async function findByProfessionalName(name){
    let pros = await Professional.find()
    return pros.filter(a => a.name.indexOf(name)!=-1)
}

module.exports = {
    create,
    getAll,
    getById,
    findByYear,
    findByName,
    findByRating,
    findByProfessional,
    update,
    delete: _delete,
    findByProfessionalName:findByProfessionalName
};