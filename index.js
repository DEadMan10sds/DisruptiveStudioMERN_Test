import { Server } from "./models/Server.js";
import { PORT, DATABASE_URL } from "./config/variables.js";
import generalRoutes from "./routes/general.js";
import UserRouter from "./routes/user.js";
import thematicRouter from "./routes/thematic.js";
import MultimediaRouter from "./routes/Multimedia.js";

const DisruptiveServer = new Server(PORT, DATABASE_URL, [
  {
    name: "multimedia",
    path: "/api/multimedia",
    router: MultimediaRouter,
  },
  {
    name: "thematic",
    path: "/api/thematic",
    router: thematicRouter,
  },
  {
    name: "users",
    path: "/api/user",
    router: UserRouter,
  },
  {
    name: "general",
    path: "",
    router: generalRoutes,
  },
]);

DisruptiveServer.listen();
