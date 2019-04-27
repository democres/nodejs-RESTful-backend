const express = require('express');
const router = express.Router();
const ocrService = require('./ocr.service');

// routes
router.get('/:taskId', getAll);

module.exports = router;

function getAll(req, res, next) {

    ocrService.getAll(req.params.taskId, function (result) {
        console.log(req.params.taskId);
        res.json(result);
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
