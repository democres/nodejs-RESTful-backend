const express = require('express');
const router = express.Router();
const newsService = require('./news.service');

// routes
router.post('/createNews', createNews);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createNews(req, res, next) {
    newsService.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    newsService.getAll()
        .then(allNews => res.json(allNews))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    newsService.getById(req.news.sub)
        .then(news => news ? res.json(news) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    newsService.getById(req.params.id)
        .then(news => news ? res.json(news) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    newsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    newsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
