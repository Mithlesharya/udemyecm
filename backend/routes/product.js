import express from 'express';
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();


router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products/new', newProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);



export default router;