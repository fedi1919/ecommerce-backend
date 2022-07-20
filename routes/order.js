const router = require("express").Router();

const orderControllers = require("../controllers/order-controllers");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

router.post("/", verifyToken, orderControllers.createOrder);
router.put("/oid", verifyTokenAndAdmin, orderControllers.updateOrder);
router.delete("/oid", verifyTokenAndAdmin, orderControllers.deleteOrder);
router.get("/uid", verifyTokenAndAuthorization, orderControllers.getOrder);
router.get("/", verifyTokenAndAdmin, orderControllers.getAllOrders);
router.get("/income", verifyTokenAndAdmin, orderControllers.getIncome);

module.exports = router;
