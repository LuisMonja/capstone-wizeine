import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  configuration,
  dbConnection,
  handleError,
  logError,
} from "./middleware/index.js";
import { defaultConfig } from "./providers/index.js";
import { StatesRoute, PostsRoute } from "./routes/index.js";
import { Server } from "socket.io";

const app = express();
const io = new Server(3000,{cors: {
  origin: "*"
}});
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.text({ limit: "200mb" }));

app.use(configuration);
app.use(dbConnection);
//app.use(dbConnection);

PostsRoute(app);
StatesRoute(app);

app.use(logError);
app.use(handleError);

app.listen(defaultConfig.port, () => {
  console.log(
    `${defaultConfig.user} listen at http://${defaultConfig.host}:${defaultConfig.port}`
  );
});
