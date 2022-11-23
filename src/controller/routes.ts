import http from "http";
import express, { Express, json, Request, Response, response } from "express";
import morgan from "morgan";
import cors from "cors";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";
import { productRpository } from "../repository/ProductRepository";

export const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

export const routes = () => {
  router.post("/register", async (req: Request, res: Response) => {
    try {
      await UserService.registre(req);
      res.send(req.body);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      await UserService.login(req);
      res.json({ user: req });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post("/admin/add", async (req, res) => {
    try {
      await ProductService.addProduct(req.body);
      res.status(200).send();
    } catch (e: any) {
      throw new Error("Something went wrong");
    }
  });

  router.get("/admin/get", async (req, res) => {
    try {
      const products = await productRpository.getAllProducts();
      console.log(products);
      res.send(products);
    } catch (err: any) {
      throw new Error("Something went wrong");
    }
  });

  router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });
};

export const httpServer = http.createServer(router);
