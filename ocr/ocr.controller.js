const express = require('express');
const router = express.Router();
const ocrService = require('./ocr.service');

// routes
router.post('/createTag', createNewTag);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createNewTag(req, res, next) {
    ocrService.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
}

function getAll(req, res, next) {

    ocrService.getAll(function (result) {
        res.json(JSON.stringify(result));
    });

}

function getCurrent(req, res, next) {
    ocrService.getById(req.tag.sub)
        .then(tag => tag ? res.json(tag) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    ocrService.getById(req.params.id)
        .then(tag => tag ? res.json(tag) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    ocrService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    ocrService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
