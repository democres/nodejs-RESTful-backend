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
    // res.type('Content-Type', 'text/xml');
    // res.send('<?xml version="1.0" encoding="utf-8"?><response><task id="b12be884-28e3-4e53-bfd2-bbc6573945da" registrationTime="2019-04-28T04:32:57Z" statusChangeTime="2019-04-28T04:33:09Z" status="Completed" filesCount="1" credits="10" resultUrl="https://ocrsdkwestus.blob.core.windows.net/files/b12be884-28e3-4e53-bfd2-bbc6573945da.result?sv=2012-02-12&amp;se=2019-04-28T22%3A00%3A00Z&amp;sr=b&amp;si=downloadResults&amp;sig=6U7e%2BgI6dGIxw4lAwo%2FKpfo3JNI9DczrGXMxPLhKptc%3D" /></response>');
}

function getResults(req, res, next) {
    ocrService.getResults(req.params.resultUrl, function (result) {
        console.log(req.params.resultUrl);
        res.json(result);
    });
}


