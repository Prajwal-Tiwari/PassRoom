import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success: false, message: "No Token provided"});
    }
    const token = authHeaser.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch(err){
        return res.status(401).json({success: false, message: "Invalid or expired token"});
    }
};