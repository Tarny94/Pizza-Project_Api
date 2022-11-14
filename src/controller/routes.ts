import http from "http";
import express, { Express, json, response } from "express";
import morgan from "morgan";
import cors from "cors";
import { Service } from "../service/userService";

export const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

export const routes = () => {
  router.post("/registre", async (req: any, res: any) => {
    try {
      const user = req.body.user;
      Service.checkRegistreService(user);
      res.json({ user });
    } catch (e: any) {
      console.log("ErrServ: ", e);
      res.status(400).json({ error: "test", err: e.message });
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
