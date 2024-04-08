// post.routes.js

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getById);

router.post('/products', ProductController.addItem);

router.put('/products/:id', ProductController.updateItem);

router.delete('/products/:id', ProductController.deleteItem);

module.exports = router;
