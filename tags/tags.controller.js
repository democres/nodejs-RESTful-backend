const express = require('express');
const router = express.Router();
const tagService = require('./tag.service');

// routes
router.post('/createTag', createNewTag);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createNewTag(req, res, next) {
    tagService.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    tagService.getAll()
        .then(tags => res.json(tags))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    tagService.getById(req.tag.sub)
        .then(tag => tag ? res.json(tag) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    tagService.getById(req.params.id)
        .then(tag => tag ? res.json(tag) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    tagService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    tagService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
