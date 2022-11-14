import http from "http";
import express, { Express, json, response } from "express";
import morgan from "morgan";
import cors from "cors";
import { UserService } from "../service/UserService";

export const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

export const routes = () => {
  router.post("/registre", async (req: any, res: any) => {
    try {
      const user = req.body.user;
      await UserService.registre(user);
      console.log(res.json({ user }));
    } catch (e: any) {
      res.status(400).json({ err: e.message });
    }
  });

  router.get("/users", async (req, res): Promise<any> => {
    try {
      const users = await req.body;
      console.log(users);
      res.status(202).send("Succesfull");
    } catch (e) {
      res.status(400).send();
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
