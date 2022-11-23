import { productValidation } from "../validator/ProductValidator";
import { productRpository } from "../repository/ProductRepository";
import { Product } from "../interface/Product";

export class ProductService {
  public static async addProduct(data: Product) {
    try {
      return await productRpository.addProduct(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
