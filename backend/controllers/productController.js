import Product from '../model/product.js';
import ErrorHandler from '../Handlers/errorHandlers.js';
import { catchAsyncError } from '../Handlers/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeature.js';

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
 
   //pagination 
   const resultperPage = 4;
   const productCount = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(), req.query);
   apiFeatures.search() // call from apifeatures
   apiFeatures.filter() // call from apifeatures
   apiFeatures.pagination(resultperPage);
   const product = await apiFeatures.query;
   res.status(200).json({
      count: product.length,
      success: true,
      productCount,
      product
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

   await Product.remove();

   res.status(200).json({
      success: true,
      message: 'product is deleted.'
   })

})