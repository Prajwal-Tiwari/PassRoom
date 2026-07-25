import Credential from "../models/Credential.model.js";
import { encrypt, decrypt } from "../utils/encryption.js";
import { checkPwned } from "../utils/hibp.js";

export const addCredential = async (req, res, next) => {
  try {
    const { website, username, password } = req.body;
    const encryptedPassword = encrypt(password);

    const credential = await Credential.create({
      userId: req.user.id,
      website,
      username,
      password: encryptedPassword,
    });

    res.status(201).json({ success: true, credential });
  } catch (err) {
    next(err);
  }
};

// new, separate, optional
export const checkPasswordHealth = async (req, res, next) => {
  try {
    const { password } = req.body;
    const breachCount = await checkPwned(password);

    res.status(200).json({
      success: true,
      breached: breachCount === null ? null : breachCount > 0,
      breachCount,
    });
  } catch (err) {
    next(err);
  }
};

export const getCredential = async (req, res, next) => {
  try {
    const credentials = await Credential.find({ userId: req.user.id });

    //decrypt before sending back
    const decrypted = credentials.map((cred) => ({
      id: cred._id,
      website: cred.website,
      username: cred.username,
      password: decrypt(cred.password),
    }));
    res.status(200).json({ success: true, credentials: decrypted });
  } catch (err) {
    next(err);
  }
};

export const deleteCredential = async (req, res, next) => {
  try {
    const credential = await Credential.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, //only user can delete their own credential
    });
    if (!credential) {
      return res
        .status(404)
        .json({ success: false, message: "Credentails not found" });
    }

    res.status(200).json({ success: true, message: "deleted..." });
  } catch (err) {
    next(err);
  }
};
