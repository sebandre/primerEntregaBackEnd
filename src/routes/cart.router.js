import { Router } from "express";
import CartManager from "../cartManager.js"

const cartManager = new CartManager("./src/cart.json");
export const cartRouter = Router();

// Create new cart
cartRouter.post('/', async (req, res) => {
    try{
        const newCart = await cartManager.createEmptyCart();
        res.status(201).json({status:"success", message: "Cart created", data:newCart});
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});


//View product by cart id
cartRouter.get('/:cid', async (req, res) => {
    try{
        const {cid} = req.params;
    const product = await cartManager.viewCartProducts(parseInt(cid));
    if (product) {
        res.status(200).json(product);
    } else {
        return res.status(404).json({error: 'Cart not found'});
    }
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }   
});

//Add Products
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
        await cartManager.addProductToCart(+cid, +pid ,1);
        return res.status(201).json({message:"Product added successfully"})
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }   
});

