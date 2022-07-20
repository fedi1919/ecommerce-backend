const CryptoJS = require("crypto-js");

const User = require("../models/User");

//UPDATE USER
const update = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.uid,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.uid);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    const { password, ...others } = user._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL USER
const getAllUser = async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER STATS
const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.update = update;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.getAllUser = getAllUser;
exports.getStats = getStats;
