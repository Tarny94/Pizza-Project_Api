import http from "http";
import express, { Express, Request, Response } from "express";
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
  router.post("/register", async (req, res) => {
    try {
      await UserService.registre(req);
      res.sendStatus(200);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const user = await UserService.login(req);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post("/admin/add", async (req, res) => {
    try {
      await ProductService.addProduct(req.body);
      res.status(200).send();
    } catch (e: any) {
      res.status(400).json();
    }
  });

  router.get("/admin/get", async (req, res) => {
    try {
      const products = await productRpository.getAllProducts();

      res.send(products);
    } catch (err: any) {
      res.status(400).json();
    }
  });

  router.delete("/admin/delete:id", async (req, res) => {
    try {
      await productRpository.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  });

  router.patch("/admin/update", async (req, res) => {
    try {
      console.log(req.body);
      const response = await ProductService.updateProduct(req.body);
      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
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
