import { routes, httpServer } from "./controller/routes";
import { init } from "./config/database";

init();
routes();

const PORT = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
