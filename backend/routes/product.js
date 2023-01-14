import express from 'express';
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAuthenticatedUser } from '../Handlers/auth.js';

const router = express.Router();


router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products/new', isAuthenticatedUser, newProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined
router.put('/products/:id', isAuthenticatedUser, updateProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined
router.delete('/products/:id', isAuthenticatedUser, deleteProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined



export default router;