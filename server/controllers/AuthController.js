import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user

export const registerUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const hash = bcrypt.hashSync(req.body.password, salt);
    const oldUser = await UserModel.find({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });

    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json(user,token);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login User
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: username});
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));

         // implementing authorization with JWT 
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            {expiresIn: "2h"}
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({details: { ...otherDetails },isAdmin})
    } catch (err) {
        res.status(500).json(err);

    }
}
