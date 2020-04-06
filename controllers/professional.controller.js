const express = require('express');
const router = express.Router();
const professionalService = require('../services/professional.service');

router.post('/create', create);
router.get('/list', getAll);
router.get('/:id', getById);
router.get('/search/:name', findByName);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    professionalService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function findByName(req, res, next) {
    professionalService.findByName(req.params.name)
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function create(req, res, next) {
    professionalService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    professionalService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    professionalService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    professionalService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    professionalService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}