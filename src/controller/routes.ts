import http from "http";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { UserService } from "../service/UserService";

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

  router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });
};

export const httpServer = http.createServer(router);
