const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.service');

router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    movieService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}