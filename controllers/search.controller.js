const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.service');

router.get('/list', getAll);
router.get('/findByYear/:year', findByYear);
router.get('/findByName/:name', findByName);
router.get('/findByProfessional/:id', findByProfessional);
router.get('/findByRating/:rating', findByRating);

module.exports = router;

function getAll(req, res, next) {
    movieService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function findByYear(req, res, next) {
    let year = req.params.year

    movieService.findByYear(req.params.year)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function findByName(req, res, next) {
    movieService.findByName(req.params.name)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function findByProfessional(req, res, next) {
    movieService.findByProfessional(req.params.id)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function findByRating(req, res, next) {
    movieService.findByRating(req.params.rating)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}