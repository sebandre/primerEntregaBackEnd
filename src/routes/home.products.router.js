import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("./src/products.json");
const homeproductsrouter = Router();


homeproductsrouter.get('/', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        return res.status(200).render('home', {products});
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});

export default homeproductsrouter;