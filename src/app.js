import express from "express";
import productsRouter from "./routes/products.router.js"
import {cartRouter} from "./routes/cart.router.js";
//
const PORT = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, ()=> console.log(`📢 Server listening on port: ${PORT}`));



app.get("*", (req, res) =>{
    res.status(404).json({status: "error", msg:"Path not found"});
});
