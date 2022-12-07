import { execute } from "../config/database";
import { Product } from "../interface/Product";

export class ProductRepository {
  public static async addProduct(product: Product) {
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
      throw new Error("Something went wrong with server");
    }
  }

  public static async getProduct(pizza_id: any) {
    try {
      return await execute("SELECT * FROM pizza_model WHERE pizza_id=? ", [
        pizza_id,
      ]);
    } catch (e) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async getAllProducts() {
    try {
      return await execute("SELECT * FROM pizza_model", []);
    } catch (e) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async deleteProduct(product_id: any) {
    try {
      return await execute(`DELETE FROM pizza_model WHERE pizza_id=?`, [
        product_id,
      ]);
    } catch (err) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async updateProduct(product: Product) {
    try {
      return await execute(
        `UPDATE pizza_model SET image=?,title=?, description=?, price=?, discount=? WHERE pizza_id=?`,
        [
          product.image,
          product.title,
          product.description,
          product.price,
          product.discount,
          product.pizza_id,
        ]
      );
    } catch (e) {
      throw new Error("Something went wrong with server");
    }
  }
}
