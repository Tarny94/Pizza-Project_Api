import http from 'http';
import express, { Express, json, response } from 'express';
import morgan from 'morgan';
import cors from "cors";
import { userRepository } from "./controler/routes";
import { userService } from './service/userService';
import { init } from './config/database';

const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());

init();
router.post("/registre", async (req: any, res: any) => {
  try {
    const user = req.body.user;
    userService.verifyUserRegistre(user);
    await userRepository.addUser(user);
    res.json({ user });
  } catch (e : any) {
    console.log("ErrServ: ",e);
    res.status(400).json({error: "test", err : e.message});
    
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
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//You dont need to have twice classes in the same component

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));