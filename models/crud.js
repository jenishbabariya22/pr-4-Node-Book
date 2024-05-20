const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
    book: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const tblname = mongoose.model('crud', crudschema);
module.exports = tblname;