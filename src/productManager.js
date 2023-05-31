import { promises as fs } from "fs";


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    console.log(this.path);
  }
  

  async init() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      this.products = products;
      if (this.products.length === 0) {
        this.lastId = 0;
      } else {
        this.lastId = this.products[this.products.length - 1].pid;
      }
    } catch (error) {
      this.lastId = 0;
    }
  }

  async addProduct({title, description, price, status, thumbnail, code, stock}) {
    await this.init();
    const product = {
      pid: this.lastId + 1,
      title,
      description,
      price: +price,
      status: (status === "true"),
      thumbnail,
      code,
      stock: +stock,
    };
    this.products.push(product);
    await this.saveToFile();
  }

  async getProducts() {
    await this.init();
    return this.products;
  }


  async getProductById(productId) {
    await this.init();
    const product = this.products.find((p) => p.pid === productId);
    if (product) {
      return product;
    } else {
      return ("Product not found");
    }
  }

  async updateProduct(productId, options) {
    const product = await this.getProductById(productId);
    if (!product) {
      return "Product not found";
    }
    if (options.title !== undefined) {
      product.title = options.title;
    }
    if (options.description !== undefined) {
      product.description = options.description;
    }
    if (options.price !== undefined) {
      product.price = options.price;
    }
    if (options.status !== undefined) {
      product.status = options.status;
    }
    if (options.thumbnail !== undefined) {
      product.thumbnail = options.thumbnail;
    }
    if (options.code !== undefined) {
      product.code = options.code;
    }
    if (options.stock !== undefined) {
      product.stock = options.stock;
    }
    await this.saveToFile();
    return "Product successfully updated";
  }

  async deleteProduct(productId) {
    const product = await this.getProductById(productId);
    if (!product) {
      return "Product not found";
    }
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    await this.saveToFile();
    return "Product successfully removed";
  }

  async saveToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      console.error("Error saving products to file:", error);
    }
  }
}

const productManager = new ProductManager("products.json");


export default ProductManager;