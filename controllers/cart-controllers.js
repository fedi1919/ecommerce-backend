const Cart = require("../models/Cart");

//CREATE PRODUCT
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE CART
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cid,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cid);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.uid });

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL CARTS
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createCart = createCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.getCart = getCart;
exports.getAllCarts = getAllCarts;
