const express = require('express');
const router = express.Router();
const ocrService = require('./ocr.service');

// routes
router.get('/:taskId', getAll);
router.get('/results/:resultUrl', getResults);

module.exports = router;

function getAll(req, res, next) {

    ocrService.getAll(req.params.taskId, function (result) {
        console.log(req.params.taskId);
        res.json(result);
    });

}

function getResults(req, res, next) {
    ocrService.getResults(req.params.resultUrl, function (result) {
        console.log(req.params.resultUrl);
        res.json(result);
    });
}


