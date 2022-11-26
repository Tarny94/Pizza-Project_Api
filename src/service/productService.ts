import { productValidation } from "../validator/ProductValidator";
import { productRpository } from "../repository/ProductRepository";
import { Product } from "../interface/Product";
import { ADMIN_KEY } from "../config/vars.config";

export class ProductService {
  public static async addProduct(data: Product) {
    try {
      return await productRpository.addProduct(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async updateProduct(data: Product) {
    try {
      return await productRpository.updateProduct(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async loginAdmin(code: string) {
    try {
      const admin_code = ADMIN_KEY;
      return productValidation.validationLoginAdminCode(
        JSON.stringify(code),
        JSON.stringify(admin_code)
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
