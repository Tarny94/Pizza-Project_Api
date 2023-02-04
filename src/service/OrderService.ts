import { OrderRepository } from "../repository/OrderRepository";
import { Request } from "express";
import { Order } from "../interface/Order";
import { Address } from "../interface/Address";

export class OrderService {
  public static async getAddress(req: Request) {
    return await OrderRepository.getAddress(req.params.id);
  }

  public static async addOrder(req: Request) {
    const order: Order = req.body;
    const productsContains: any = req.body.productsContains;

    await OrderRepository.addOrder(order);

    const data: any = await OrderRepository.getLastOrderID();
    const orderId: string = data[0].id;
    console.log("orderID:", orderId);
    if (!orderId) {
      throw new Error("Something went wrong with order_id");
    }
    productsContains.map(async (item: any) => {
      console.log("id", item);
      return await OrderRepository.addOrderProducts(
        orderId,
        item.productId,
        item.productPieces
      );
    });
  }

  public static async addAddress(req: Request) {
    return await OrderRepository.addAddress(req.body);
  }

  public static async deleteAddress(req: Request) {
    return await OrderRepository.deleteAddress(req.params.id);
  }
}
