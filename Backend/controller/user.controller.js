import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"


export const singup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match " })
    }
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({ message: "Email Already Exists" })
    }
    const hashPasword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashPasword
    })
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({ message: "User Registered Successfully ", newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const decPassword = await bcrypt.compare(password, user.password)
    if (!user || !decPassword) {
      return res.status(400).json({ message: "Invalid User Or Password " })
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User Logged In Successfully", user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })

  }


}

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt')
    res.status(201).json({ message: "User Logout Successfully" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
}



export const getUserProfile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // ✅ correct

    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");

    res.status(200).json(filteredUser); // ✅ 200 instead of 201
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};