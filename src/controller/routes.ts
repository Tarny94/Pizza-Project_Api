import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { UserService } from "../service/userService";
import { ProductService } from "../service/productService";
import { ProductRepository } from "../repository/ProductRepository";
import { AdminAuth } from "../middleware/AuthAdmin";
import { Auth } from "../middleware/Auth";
import { OrderService } from "../service/OrderService";

export const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

export const routes = () => {
  router.post("/register", async (req: Request, res: Response) => {
    try {
      await UserService.registre(req);
      res.sendStatus(200);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      res.status(200).json({ message: "You are live" });
    } catch (err: any) {
      res.status(500).json({ message: "Fail" });
    }
  });

  router.post("/login", async (req: Request, res: Response) => {
    try {
      res.status(200).json(await UserService.login(req));
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post(
    "/admin/login/page",
    AdminAuth,
    async (req: Request, res: Response) => {
      try {
        res.status(200).json();
      } catch (e: any) {
        res.status(400).json({ error: e.message });
      }
    }
  );

  router.post("/admin/login", async (req: Request, res: Response) => {
    try {
      await UserService.loginAdmin(req);
      res.status(200).json();
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.post("/add/product", async (req: Request, res: Response) => {
    try {
      await ProductService.addProduct(req);
      res.status(200).send();
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.post("/add/order", Auth, async (req: Request, res: Response) => {
    try {
      await OrderService.addOrder(req);
      res.status(200).send();
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.post("/add/address", Auth, async (req: Request, res: Response) => {
    try {
      await OrderService.addAddress(req);
      res.status(200).send();
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.get("/get/products", async (req: Request, res: Response) => {
    try {
      res.status(200).send(await ProductService.getAllProducts());
    } catch (err: any) {
      res.status(400).json();
    }
  });

  router.get("/get/address", Auth, async (req: Request, res: Response) => {
    try {
      const data: any = await OrderService.getAddress(req);
      res.status(200).send(data);
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.get("/get/addres/:id", async (req: Request, res: Response) => {
    try {
      const data: any = await OrderService.getAddressById(req);
      res.status(200).send(data);
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.get("/user/:id", async (req: Request, res: Response) => {
    try {
      const user: any = await UserService.getUser(req.params.id);
      res.status(200).send(user && user);
    } catch (err: any) {
      res.status(404).json();
    }
  });

  router.get("/get/product/:id", async (req: Request, res: Response) => {
    try {
      res.status(200).send(await ProductRepository.getProduct(req.params.id));
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.delete(
    "/delete/product/:id",
    AdminAuth,
    async (req: Request, res: Response) => {
      try {
        await ProductService.deleteProduct(req);
        res.status(204).send();
      } catch (e: any) {
        res.status(400).send({ error: e.message });
      }
    }
  );

  router.delete(
    "/delete/address/:id",

    async (req: Request, res: Response) => {
      try {
        await OrderService.deleteAddress(req);
        res.status(204).send();
      } catch (e: any) {
        res.status(400).send({ error: e.message });
      }
    }
  );

  router.patch("/update/product", async (req: Request, res: Response) => {
    try {
      res.status(200).json(await ProductService.updateProduct(req.body));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });
};

  

export const httpServer = http.createServer(router);
