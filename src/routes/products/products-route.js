const express = require('express')
const { addProduct, getProducts, deleteProduct, getProductById, updateProductOne, searchProduct } = require('../../controllers/products/products-controller')
const router = express.Router()


router.post('/add-product', addProduct)
router.get('/all-product', getProducts)
router.get('/search/:query', searchProduct)
router.delete('/product/:id', deleteProduct)
router.get('/get-oneproduct/:id', getProductById)
router.put('/update-product/:id', updateProductOne)


module.exports = router;
