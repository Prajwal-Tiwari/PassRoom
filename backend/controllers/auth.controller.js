import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const SALT_ROUNDS = 10;

export const signup = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({success: false, message: "Email already registered"});
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.status(200).json(
            {
                success: true,
                token,
                user: {id: user._id, name: user.name, email: user.email, role: user.role },
            }
        );
    } catch(err) {
        next(err);
    }
};

export const login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({success: false, message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({success: false, message: "Invalid Password or Username"});
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        return res.status(200).json({
            success: true,
            token,
            user: {id: user._id, name: user.name, email: user.email, role: user.role},
        });
    } catch(err){
        next(err);
    }
};