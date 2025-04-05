import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getdatauri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.cookie('token', token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });;
        
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const userId=req.id;
        const {name,description}=req.body;
        const file=req.file;

        // const fileUri=getdatauri(file);
        // const uploadres=await cloudinary.uploader.upload(fileUri);

        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if(name){
            user.name=name;
        }

        if(description){
            user.description=description;
        }

        if (file) {
            const fileUri = getdatauri(file);
            const uploadRes = await cloudinary.uploader.upload(fileUri);
            user.photoUrl = uploadRes.secure_url;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}