const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    newsBody: { type: String, required: true },
    author: { type: String, required: true },
    newsTags: [{
        type: String, required: true
    }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('News', schema);
