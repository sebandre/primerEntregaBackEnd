import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("./src/products.json");
const realtimeproductsrouter = Router();


realtimeproductsrouter.get('/', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        return res.render("realtimeproducts", {products: products})
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});






export default realtimeproductsrouter;


