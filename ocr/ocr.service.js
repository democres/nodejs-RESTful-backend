const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tag = db.Tag;
const https = require('https');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll(taskId,callback) {

    https.get('https://ExpenseReportDev:nye3E/8A0GG1Tt71Wsc/+DNy@cloud-westus.ocrsdk.com/getTaskStatus?taskId='+taskId, (resp) => {
            
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

async function getById(id) {
    return await Tag.findById(id).select('-hash');
}

async function create(tagParam) {
    const tag = new Tag(tagParam);
    // save tag
    await tag.save();
}

async function update(id, tagParam) {
    const tag = await Tag.findById(id);

    // validate
    if (!tag) throw 'Tag not found';
    if (tag.tagName !== tagParam.tagName && await Tag.findOne({ tagName: tagParam.tagName })) {
        throw 'tag already exists';
    }

    Object.assign(tag, tagParam);

    await tag.save();
}

async function _delete(id) {
    await Tag.findByIdAndRemove(id);
}
