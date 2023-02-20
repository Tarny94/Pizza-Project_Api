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

  public static async getAddressById(id: string) {
    try {
      return await execute(
        "SELECT id,address,ap,city,county,number,staircase FROM address WHERE id=?",
        [id]
      );
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

  public static async addOrder(order: Order, id: string) {
    try {
      return await execute(
        "INSERT INTO orders(user_id,total_cost,tips,products_cost,comment,address_id,wrapping_cost,delivery_cost,tableware) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          id,
          order.totalCost,
          order.tips,
          order.productsCost,
          order.comments,
          order.addressID,
          order.wrapping,
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

  public static async addAddress(address: Address, id: string) {
    try {
      console.log("REP:", address);
      return await execute(
        "INSERT INTO address(user_id,address,county,city,number,staircase,ap) VALUES (?,?,?,?,?,?,?)",
        [
          id,
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
