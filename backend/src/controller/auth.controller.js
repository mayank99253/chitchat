import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
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
      fullname,
      email,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic
      });
      // todo : sent a welcome email to the user 
    } else {
      res.status(400).json({ message: "Invalid User Data" })
    }
  } catch (error) {
    console.log("Error in Sign up Controller ", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}