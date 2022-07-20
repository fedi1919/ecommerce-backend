const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//REGISTER
const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(err || "could not save user");
  }
};

//LOGIN
const login = async (req, res) => {
  const { username, inputPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      username,
    });
  } catch (error) {
    res.status(500).json(error || "Logging In Failed. Please Try Again Later.");
  }

  !existingUser && res.status(401).json("Wrong User Name");

  const hashedPassword = CryptoJS.AES.decrypt(
    existingUser.password,
    process.env.PASS_SEC
  );

  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  originalPassword != inputPassword && res.status(401).json("Wrong Password");

  const accessToken = jwt.sign(
    {
      id: existingUser._id,
      isAdmin: existingUser.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );

  //IF EVERYTHING MATCHES
  const { password, ...others } = existingUser._doc;
  res.status(200).json({ ...others, accessToken });
};

exports.register = register;
exports.login = login;
