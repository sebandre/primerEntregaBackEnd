import express from "express";
import productsRouter from "./routes/products.router.js"

import {cartRouter} from "./routes/cart.router.js";
import { __dirname } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import homeproductsrouter from "./routes/home.products.router.js";
import realtimeproductsrouter from "./routes/real.time.products.router.js"
import { Server } from 'socket.io'
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("./src/products.json");

const PORT = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", (path.join(__dirname, "/views")));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", homeproductsrouter);
app.use("/realtimeproducts", realtimeproductsrouter);


const httpServer = app.listen(PORT, ()=> console.log(`📢 Server listening on http://localhost:${PORT}`));
const io = new Server(httpServer);

io.on("connection", (socket)=>{
    console.log("se abrio un socket" + socket.id);
    socket.on("newProduct", async (product) => {
        try {
          await productManager.addProduct(product);
          const productListUpdated = await productManager.getProducts();
          io.emit("refresh-products", productListUpdated);
        } catch (err) {
          console.log(err);
        }
    });    
});




  

app.get("*", (req, res) =>{
    res.status(404).json({status: "error", msg:"Path not found"});
});
