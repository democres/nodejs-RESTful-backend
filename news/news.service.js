const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const News = db.News;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await News.find().select('-hash');
}

async function getById(id) {
    return await News.findById(id).select('-hash');
}

async function create(newsParam) {
    const news = new News(newsParam);
    // save news
    await news.save();
}

async function update(id, newsParam) {
    const news = await News.findById(id);

    // validate
    if (!news) throw 'News not found';
    if (news.title !== newsParam.title && await News.findOne({ title: newsParam.title })) {
        throw 'news already exists';
    }

    Object.assign(news, newsParam);

    await news.save();
}

async function _delete(id) {
    await News.findByIdAndRemove(id);
}
