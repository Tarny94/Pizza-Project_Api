import "./config/configenv";
import { routes, httpServer } from "./controller/routes";
import { init } from "./config/database";
import { DATA_SOURCES } from "./config/vars.config";


init();
routes();

const PORT = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
