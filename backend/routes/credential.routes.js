import express from "express";
import {requireAuth} from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {credentialSchema} from "../utils/validationSchema.js";
import { addCredential, checkPasswordHealth, getCredential, deleteCredential, checkCredentialBreach } from "../controllers/credential.controller.js";

const router  = express.Router();
router.use(requireAuth);//with this, below every routes will rerquire a valid token

router.post("/", validate(credentialSchema), addCredential);
router.get("/", getCredential);
router.delete("/:id", deleteCredential);
router.post("/:id/check-breach", checkCredentialBreach)
router.post("/check-password", checkPasswordHealth);

export default router;