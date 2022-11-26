import { Product } from "../interface/Product";

class ProductValidator {
  public validationProduct(data: Product) {}
  public validationLoginAdminCode(code: string, admin_key: string) {
    if (code !== admin_key) {
      throw new Error("Invalid credential");
    }
  }
}

export const productValidation = new ProductValidator();
