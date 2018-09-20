const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const News = db.News;

module.exports = {
    searchByTitle,
    searchByAuthor,
    searchByNewsTags,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function searchByTitle(title) {
    return await News.findOne({ "title": title });
}

async function searchByAuthor(author) {
    return await News.find({ "author": author });
}

async function searchByNewsTags(tags) {
    return await News.find({ "newsTags": tags });
}

async function getAll(page) {
    return await News.find().select('-hash').skip(3 * page).limit(3);
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
