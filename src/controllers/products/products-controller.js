const asyncHandler = require('express-async-handler');
const Products = require('../../models/products-model')


const addProduct = asyncHandler(async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result)
})
const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ message: 'No products here...' })
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    let result = await Products.deleteOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.status(400)
        throw new Error('Invalid product Id')
    }
})
const getProductById = asyncHandler(async (req, res) => {
    let result = await Products.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.status(400)
        throw new Error('Invalid product Id')
    }
})
const updateProductOne = asyncHandler(async (req, res) => {
    let result = await Products.updateOne({ _id: req.params.id }, { $set: req.body })
    if (result) {
        res.send(result)
    } else {
        res.status(400)
        throw new Error('Invalid product Id')
    }
})


const searchProduct = asyncHandler(async (req, res) => {
    try {
        let result = await Products.find({
            "$or": [
                { name: { $regex: req.params.query } },
                { company: { $regex: req.params.query } },
                { category: { $regex: req.params.query } },
            ]
        });
        res.status(200).json({
            result
        })
    } catch (error) {
        console.log(error)
    }
})


module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProductOne,
    searchProduct
}