const router = require('express').Router();
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');


// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(err)
    }
})

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted!")
    } catch (error) {
        res.status(500).json(err)
    }
})

// Get Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(err)
    }
});


// Get All Products
router.get("/", async (req, res) => {
    try {
        let products = await Product.find().sort({createdAt: -1}).limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(err)
    }
})


module.exports = router;