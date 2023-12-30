const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/products', homeController.productsList);
router.post('/products/create', homeController.createNewProduct);
router.delete('/products/:id', homeController.deleteProduct);
router.post('/products/:id/update_quantity', homeController.updateProduct);

module.exports = router;