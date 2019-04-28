const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tag = db.Tag;
const https = require('https');
let parseString = require('xml2js').parseString;

module.exports = {
    getAll,
    getResults,
};

function getAll(taskId,callback) {

    https.get('https://ExpenseReportDev:WhOc9lUGApoPPG50y20KdI0H@cloud-westus.ocrsdk.com/getTaskStatus?taskId='+taskId, (resp) => {
            
                let data = '';
                // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(data);

                var ocrResultUrl = ""
                parseString(data, function (err, result) {
                    console.log("THIS IS THE PARSED RESULT URL-> " + JSON.stringify(result));
                    ocrResultUrl = result.response.task[0]["$"].resultUrl;
                });
                console.log("THIS IS THE OCR RESULT URL-> " + ocrResultUrl);
                https.get(ocrResultUrl, (resp) => {
                    let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    console.log(data);
                    callback(data);
                });
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });

            });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

}





function getResults(resultUrl,callback) {

    https.get(resultUrl, (resp) => {
            
                let data = '';
                // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(data);
                callback(data);
            });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

}
