import express, { Request, Response } from "express";

import dotenv from "dotenv";
import router from "./router";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./doc/swagger-output.json";
import cors from "cors";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";
declare module "express-session" {
  interface SessionData {
    uid: string;
  }
}

dotenv.config();

//onst PORT = process.env.PORT;

const app = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin not allowed:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Title", "Content-Artist", "Content-Cover"],
    credentials: true,
  })
);

app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("backend do projeto Harmoniq");
});

app.use(router);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.listen(PORT, () => {
//   console.log(`Express app iniciado na porta ${PORT}.`);
// });

const httpsOptions = {
  cert: fs.readFileSync("src/ssl/localhost.crt"),
  key: fs.readFileSync("src/ssl/localhost.key"),
};

const server = https.createServer(httpsOptions, app);
server.listen(443, () => {
  console.log("Servidor rodando em https://localhost:443");
});
