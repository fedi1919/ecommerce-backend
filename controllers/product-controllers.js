const Product = require("../models/Product");

//CREATE PRODUCT
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.pid,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCat = req.query.cat;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCat) {
      products = await Product.find({
        categories: {
          $in: [queryCat],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProduct = getProduct;
exports.getAllProducts = getAllProducts;
