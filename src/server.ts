import http from 'http';
import express, { Express, json } from 'express';
import morgan from 'morgan';
import cors from "cors";
import { userC } from './db/my_sql';
import { Verify } from './models/User';



const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors())

router.post("/registre", async (req : any, res : any) => {
    try {
        const user = await req.body.user;

        Verify.verifyUser(user)
        userC.addUser(user)
       
       
        res.json({user});
     
        
    } catch (e)  {
        console.log(e);
        
    }
})

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));