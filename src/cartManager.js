import { promises as fs } from "fs";

class CartManager {
    constructor(path) {
      this.path = path;
      this.cart = [];
  }

    async init() {
      try {
        const data = await fs.readFile(this.path, "utf-8");
        const cart = JSON.parse(data);
        this.cart = cart;
        if (this.cart.length === 0) {
          this.lastId = 0;
        } else {
          this.lastId = this.cart[this.cart.length - 1].cid;
        }
      } catch (error) {
        this.cart = [];
      }
    }


    async createEmptyCart() {
      await this.init();
      const newCart = { cid: this.lastId + 1, products: [] };
      this.cart.push(newCart);
      await this.saveToFile();
      return newCart;
    }
  
    async saveToFile() {
      try {
        const data = JSON.stringify(this.cart, null, 2);
        await fs.writeFile(this.path, data);
      } catch (error) {
        console.error('Error saving carts to file:', error);
      }
    }

    async addProductToCart(cartId, productId, quantity) {
      await this.init();
      const cart = this.cart.find((c) => c.cid === cartId);
      if (!cart) {
        return "Cart not found";
      }
      const existingProduct = cart.products.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const product = {
          id: productId,
          quantity: quantity,
        };
        cart.products.push(product);
      }
      await this.saveToFile();
      return "Product added to cart";
    }

    async viewCartProducts(cartId) {
      await this.init();
      const cart = this.cart.find((c) => c.cid === cartId);
      if (!cart) {
        return "Cart not found";
      }
      if (cart.products.length === 0) {
        return "Cart is empty";
      }
      const products = cart.products.map((p) => `Product ID: ${p.id}, Quantity: ${p.quantity}`);
      return products.join(" ");
    }

}
const cartManager = new CartManager("cart.json");

export default CartManager;