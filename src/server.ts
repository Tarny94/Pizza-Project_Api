import { routes, httpServer } from "./controller/routes";

import { init } from "./config/database";

init();
routes();

//You dont need to have twice classes in the same component

/** Server */

const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
