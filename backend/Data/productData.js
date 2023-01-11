import Product from "../model/product";
import product from './product.json';


const productData = async () =>{
    try {
        await Product.deleteMany({});
        await Product.insertMany(product);
        console.log('Product inserted sucessfully on database');
    } catch (error) {
        console.log('Error not inseted product on databse', error.message);
    }
}


productData();
export default productData;