import { execute } from "../config/database";
import { Order } from "../interface/Order";
import { Address } from "../interface/Address";

export class OrderRepository {
  public static async getAddress(id: any) {
    try {
      return await execute("SELECT * FROM address WHERE user_id=?", [id]);
    } catch (e: any) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async getLastOrderID() {
    try {
      return await execute(
        "SELECT id FROM orders ORDER BY id DESC LIMIT 1 ",
        []
      );
    } catch (e: any) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async addOrder(order: Order) {
    try {
      return await execute(
        "INSERT INTO orders(user_id,total_cost,data,time,tips,products_cost,comment,address_id,wrapping_cost,delivery_cost,tableware) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          order.userId,
          order.totalCost,
          order.data,
          order.time,
          order.tips,
          order.productsPrice,
          order.comment,
          order.addresId,
          order.wrappingCost,
          order.deliveryCost,
          order.tableware,
        ]
      );
    } catch (e: any) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async addOrderProducts(
    order_id: string,
    product_id: string,
    quantity: string
  ) {
    try {
      return await execute(
        "INSERT INTO order_products(order_id,product_id, quantity) VALUES (?,?,?)",
        [order_id, product_id, quantity]
      );
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public static async addAddress(address: Address) {
    try {
      console.log("REP:", address);
      return await execute(
        "INSERT INTO address(user_id,address,county,city,number,staircase,ap) VALUES (?,?,?,?,?,?,?)",
        [
          address.userId,
          address.street,
          address.county,
          address.city,
          address.number,
          address.stairCase,
          address.ap,
        ]
      );
    } catch (e: any) {
      throw new Error("Something went wrong with server");
    }
  }

  public static async deleteAddress(id: string) {
    try {
      return await execute(`DELETE FROM address WHERE id=?`, [id]);
    } catch (err) {
      throw new Error("Something went wrong with server");
    }
  }
}
