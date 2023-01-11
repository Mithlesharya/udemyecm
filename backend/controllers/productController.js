import Product from '../model/product.js';
import ErrorHandler from '../Handlers/errorHandlers.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';

// create a new product api

export const newProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.create(req.body);
   res.status(201).json({
      success: true,
      product
   })
})


// get the all products api from database 
export const getProducts = catchAsyncError(async (req, res, next) => {

   const product = await Product.find();

   res.status(200).json({
      success: true,
      product,
      count: product.length
   })
})

//get single product api
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      return next(new ErrorHandler('Product not found', 404));
   }
   res.status(200).json({
      success: true,
      product
   })
})

// update product api

export const updateProduct = catchAsyncError(async (req, res, next) => {
   let product = await Product.findById(req.params.id);
   if (!product) {
      return next(new ErrorHandler('Product not found', 404));
   }
   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
   });

   res.status(200).json({
      success: true,
      product
   })

})

export const deleteProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
           return next(new ErrorHandler('Product not found', 404));
   }

   await Product.deleteOne();

   res.status(200).json({
      success: true,
      message: 'product is deleted.'
   })


})