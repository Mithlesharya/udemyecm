import express from 'express';
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAuthenticatedUser } from '../Handlers/auth.js';

const router = express.Router();


router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products/new', isAuthenticatedUser, newProduct);
router.put('/products/:id', isAuthenticatedUser, updateProduct);
router.delete('/products/:id', isAuthenticatedUser, deleteProduct);



export default router;