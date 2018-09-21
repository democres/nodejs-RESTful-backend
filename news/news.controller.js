const express = require('express');
const router = express.Router();
const newsService = require('./news.service');

// routes
router.post('/searchByTitle', searchByTitle);
router.post('/searchByAuthor', searchByAuthor);
router.post('/searchByNewsTags', searchByNewsTags);
router.post('/createNews', createNews);
router.get('/:id', getAll);
router.get('/current', getCurrent);
router.get('/getById/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function searchByTitle(req, res, next) {
    newsService.searchByTitle(req.body.title)
        .then(news => news ? res.json(news) : res.sendStatus(404))
        .catch(err => next(err));
}

function searchByAuthor(req, res, next) {
    newsService.searchByAuthor(req.body.author)
        .then(news => news ? res.json(news) : res.sendStatus(404))
        .catch(err => next(err));
}

function searchByNewsTags(req, res, next) {
    newsService.searchByNewsTags(req.body.newsTags)
        .then(news => news ? res.json(news) : res.sendStatus(404))
        .catch(err => next(err));
}

function createNews(req, res, next) {
    newsService.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log(req.params.id);
    newsService.getAll(req.params.id)
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
