// filepath: d:\Project\E-ice\desert\BackendCode\controller\authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
// user registration
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate request data
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

// user login
export const login = async (req, res) => {
  try {
    const {email} = req.body;
    const adminUser = await Admin.findOne({email});
    if(adminUser) {
      const passwordCheck = await bcrypt.compare(req.body.password, adminUser.password);
      if(!passwordCheck) {
        return res.status(400).json({success:false, message:"Invalid password"});
      }
      const token = jwt.sign({id:adminUser._id,email:email},process.env.JWT_SECRET_KEY, {expiresIn:"1h"});
      res.cookie("access_token",token,{
        httpOnly:false,
        secure:false,
        sameSite:"lax",
        path:"/"
      });
      return res.status(200).json({success:true, message:"LoggedIn successfully as Admin",token,user:{email:adminUser.email}})
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });    

    res.cookie("access_token", token, {
      httpOnly: true,
      expires: token.expiresIn,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const adminRegistration = async (req, res) => {
  try {
    const {email, password} = req.body;
    const userExists = await Admin.findOne({email});
    if(userExists) return res.status(400).json({success:false, message:"User already exists"});

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await Admin.create({
      email,
      password:hashedPassword
    });
    return res.status(201).json({success:true, message:"Admin created successfully", user:{email:email}});
  }
  catch(err) {
    console.log(err.message);
    return res.status(500).json({success:false, message:"Some error occured please try again later"});
  }
}