import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPTION_KEY = Buffer.from(process.env.AES_KEY, "hex");

//Initialization Vectro
const IV_LENGTH = 16;

//Encrypt passwrd function, will return encryption text + IV
export const encrypt = (text) =>{
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        iv
    );

    let encrypted = cipher.update(text, "utf8", "hex");

    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};


//Decrypt psswrd
export const decrypt = (encryptedText) => {

    const parts = encryptedText.split(":");

    const iv = Buffer.from(parts[0], "hex");

    const encryptedPassword = parts[1];

    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        iv
    );

    let decrypted = decipher.update(
        encryptedPassword,
        "hex",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
};