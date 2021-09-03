import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import taskRoutes from "./routes/task.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:4000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Bienvenida de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Hola mundo",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/tasks", taskRoutes); //rutas para tareas
app.use("/api/users", usersRoutes); //no se ocupa (solo para pruebas)
app.use("/api/auth", authRoutes); //rutas de login y autenticacion

export default app;
