import crypto from "crypto";
import axios from "axios";
import { error } from "console";

export const checkPwned = async(psswd) =>{
    const sha1 = crypto.createHash("sha1").update(psswd).digest("hex").toUpperCase();
    const prefix = sha1.slice(0,5);
    const suffix = sha1.slice(5);

    try {
        const {data} = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
        const match = data.split("\n").find((line)=> line.startsWith(suffix));

        return match ? parseInt(match.split(":")[1].trim(), 10): 0;
    } catch(err){
        console.error("HIBP check failed: ", error.message);
        return null;
        //null -> couldn't check
        //0 -> checked but not breached
    }
}