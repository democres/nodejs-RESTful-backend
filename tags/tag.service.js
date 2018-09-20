const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tag = db.Tag;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Tag.find().select('-hash');
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
