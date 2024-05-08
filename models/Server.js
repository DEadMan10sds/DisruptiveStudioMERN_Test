import ConnectToDatabase from "../database/Connect.js";
import generateRouter from "../routes/genericRouter.js";
import express, { json } from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
  constructor(port, DATABASE_URL, routers) {
    this.port = port;
    this.app = express();
    this.DATABASE_URL = DATABASE_URL;

    //Generates the routes with the incoming array, converting it
    //into a object
    this.APIRoutes = routers.reduce(
      (obj, key) => ({
        ...obj,
        [key.name]: { path: key.path, router: generateRouter(key.router) },
      }),
      {}
    );

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    ConnectToDatabase(this.DATABASE_URL);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp/",
        createParentPath: true,
      })
    );
    this.app.use("/", express.static(path.resolve(__dirname, "../public")));
  }

  routes() {
    Object.keys(this.APIRoutes).forEach((newRoute) => {
      this.app.use(
        this.APIRoutes[newRoute].path,
        this.APIRoutes[newRoute].router
      );
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER RUNNING ON: ${this.port}`);
    });
  }
}
