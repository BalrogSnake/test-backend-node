import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken,
    verifySignup.checkDuplicateUsername,
  ],
  usersCtrl.createUser
);

export default router;
