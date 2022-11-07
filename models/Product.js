const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        weight: { type: String, required: true},
        img: { type: String, required: true},
        desc: { type: String, required: true},
        type: { type: Array, required: true},
        price: { type: Number, required: true},
        rating: { type: Number, required: true}
    }, { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);