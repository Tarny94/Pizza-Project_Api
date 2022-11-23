import { execute } from "../config/database";
import { Product } from "../interface/Product";

class ProductRepository {
  public async addProduct(product: Product) {
    try {
      if (!product) {
        throw new Error("No Product!");
      }
      return await execute(
        "INSERT INTO pizza_model(image,title,description, price,discount) VALUES (?,?,?,?,?)",
        [
          product.image,
          product.title,
          product.description,
          product.price,
          product.discount,
        ]
      );
    } catch (e) {
      throw new Error("Something went warong with server");
    }
  }
}

export const productRpository = new ProductRepository();
