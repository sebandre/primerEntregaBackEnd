import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("./src/products.json");
const productsRouter = Router();

// View all products
productsRouter.get('/', async (req, res) => {
    try{
        const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit){
        res.status(200).json(products.slice(0, limit));
    } else{
        res.status(200).json(products);
    }
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});

//View products by id
productsRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
    const product = await productManager.getProductById(parseInt(id));
    if (product) {
        res.status(200).json(product);
    } else {
        return res.status(404).json({error: 'Product not found'});
    }
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }   
});


//Add new product
productsRouter.post("/", async (req, res) =>{
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({status:"success", message: "Product added", data:newProduct});
    } catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});

//Update product
productsRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = req.body;
        await productManager.updateProduct(+id, updateProduct);
        res.status(201).json({status:"success", message: "Product updated", data:updateProduct});
    } catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});

//Delete product
productsRouter.delete("/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        await productManager.deleteProduct(+id);
        res.status(201).json({status:"success", message: "Product deleted"});
    } catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});


export default productsRouter;