import express from "express";
import {reqAuth} from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {credentialSchema} from "../utils/validationSchema.js";
import { addCredential, getCredential, deleteCredential } from "../controllers/credential.controller.js";
import { credentialSchema } from "../utils/validationSchema.js";

const router  = express.Router();
router.use(reqAuth);//with this, below every routes will rerquire a valid token

router.post("/", validate(credentialSchema), addCredential);
router.get("/", getCredential);
router.delete("/:id", deleteCredential);

export default router;