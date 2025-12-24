import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import { json } from "express";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the Fields are Required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be atleast 6 letters" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" })
    }
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Email already Exist" })

    //1234 =>$smsyu_&nsjhiuh
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      // before CR - coderabbit
      // generateToken(newUser._id, res)
      // await newUser.save()

      //after CB 
      //persist user first  , then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res)
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      });

      // todo : sent a welcome email to the user 
      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.log("Failed to send Welcome Email to user", error)
      }

    } else {
      res.status(400).json({ message: "Invalid User Data" })
    }
  } catch (error) {
    console.log("Error in Sign up Controller ", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password)
    return res.status(400).json({message : "Email or Password are Required"})
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid Credentials" })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Credentials" })

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.error("Error in login controller : ", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 })
  res.status(200).json({ message: "Logged out Successfully" })
}
export const updateProfile= async(req,res)=>{ 
  try {
    const {profilePic} = req.body 
    if(!profilePic) return res.status(400).json({message:"Profle Pic is Required"})

    const userId = req.user._id;
    
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {profilePic:uploadResponse.secure_url},
      {new:true}
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("error in updated profile :",error);
    res.status(500).json({message:"Internal Server Error"})
  }
}