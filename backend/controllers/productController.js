import Product from '../model/product.js';
// import ErrorHandler from '../Handlers/errorHandlers.js'

// create a new product api

export const newProduct = async (req, res, next) => {
   const product = await Product.create(req.body);
   res.status(201).json({
      success: true,
      product
   })
}


// get the all products api from database 
export const getProducts = async (req, res, next) => {

   const product = await Product.find();

   res.status(200).json({
      success: true,
      product,
      count: product.length
   })
}

// single product api
export const getSingleProduct = async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      return res.status(404).json({
         success: false,
         message: 'product not found'
      })
   }
   res.status(200).json({
      success: true,
      product
   })
}

// update product api

export const updateProduct = async (req, res, next) => {
   let product = await Product.findById(req.params.id);
   if (!product) {
     return res.status(404).json({
         success: false,
         message: 'product not found'
      })
   }
   product = await Product.findByIdAndUpdate(req.params.id, req.body,{
      new : true,
      runValidators: true
   });

   res.status(200).json({
      success: true,
      product
   })

}

export const deleteProduct =  async (req,res,next) =>{
   const product =  await Product.findById(req.params.id);
   if (!product) {
    return  res.status(404).json({
         success: false,
         message: 'product not found'
      })
   }

   await Product.deleteOne();

   res.status(200).json({
      success: true,
      message: 'product is deleted.'
   })


}