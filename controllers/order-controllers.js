const Order = require("../models/Order");

//CREATE ORDER
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.oid,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.oid);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER'S ORDER
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.uid });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET MONTHLY INCOME
const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.getOrder = getOrder;
exports.getIncome = getIncome;
exports.getAllOrders = getAllOrders;
