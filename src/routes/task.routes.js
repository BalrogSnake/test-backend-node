import { Router } from "express";
const router = Router();

import * as tasksCtrl from "../controllers/task.controller";
import { authJwt } from "../middlewares";

router.get("/",authJwt.verifyToken, tasksCtrl.getTasks);

router.get("/:taskId",authJwt.verifyToken, tasksCtrl.getTaskById);

router.post(
  "/",
  authJwt.verifyToken,
  tasksCtrl.createTask
);

router.put(
  "/:taskId",
  authJwt.verifyToken,
  tasksCtrl.updateTaskById
);

router.delete(
  "/:taskId",
  authJwt.verifyToken,
  tasksCtrl.deleteTaskById
);

export default router;