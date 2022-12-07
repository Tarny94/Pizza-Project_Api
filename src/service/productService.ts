import { ProductValidator } from "../validator/ProductValidator";
import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../interface/Product";
import { ADMIN_KEY } from "../config/vars.config";

export class ProductService {
  public static async addProduct(data: Product) {
    try {
      return await ProductRepository.addProduct(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async updateProduct(data: Product) {
    try {
      return await ProductRepository.updateProduct(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async getProduct(data: Product) {
    try {
      return await ProductRepository.getProduct(data.pizza_id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async getAllProducts() {
    try {
      return ProductRepository.getAllProducts();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async deleteProduct(req: any) {
    try {
      return ProductRepository.deleteProduct(req.params.id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
