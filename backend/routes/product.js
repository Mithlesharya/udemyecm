import express from 'express';
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAuthenticatedUser, authoriseRoles } from '../Handlers/auth.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products/new', isAuthenticatedUser, authoriseRoles('admin'), newProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined
router.put('/products/:id', isAuthenticatedUser, authoriseRoles('admin'), updateProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined
router.delete('/products/:id', isAuthenticatedUser, authoriseRoles('admin'), deleteProduct); //isAuthenticatedUser prtect to create our prodcut, only create when user logined



export default router;