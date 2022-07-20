const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

//Database Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) =>
    console.log(err.message || "Could Not Establish Connection ")
  );

app.listen(PORT, () =>
  console.log(`Backend Server Is Running On Server ${PORT}`)
);
