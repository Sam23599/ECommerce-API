const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        quantity: Number
    }
);

const product = mongoose.model('Product', productSchema);
module.exports = product;
