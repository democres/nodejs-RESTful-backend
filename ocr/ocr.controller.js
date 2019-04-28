const express = require('express');
const router = express.Router();
const ocrService = require('./ocr.service');

// routes
router.get('/:taskId', getAll);
router.get('/results/:resultUrl', getResults);

module.exports = router;

function getAll(req, res, next) {

    // ocrService.getAll(req.params.taskId, function (result) {
    //     console.log(req.params.taskId);
    //     res.json(result);
    // });


    res.json('<response><link type="text/css" id="dark-mode" rel="stylesheet" href=""/><style type="text/css" id="dark-mode-custom-style"/><task id="b12be884-28e3-4e53-bfd2-bbc6573945da" registrationTime="2019-04-28T04:32:57Z"statusChangeTime="2019-04-28T04:33:09Z" status="Completed" filesCount="1" credits="10"resultUrl="https://ocrsdkwestus.blob.core.windows.net/files/b12be884-28e3-4e53-bfd2-bbc6573945da.result?sv=2012-02-12&se=2019-04-28T14%3A00%3A00Z&sr=b&si=downloadResults&sig=N9dF76Gx3OSzAPLBBAP%2BQobOUY0t2Nld3obKol%2F2QoQ%3D"/></response>');
}

function getResults(req, res, next) {
    ocrService.getResults(req.params.resultUrl, function (result) {
        console.log(req.params.resultUrl);
        res.json(result);
    });


}


