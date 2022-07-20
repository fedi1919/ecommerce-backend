const router = require("express").Router();

const cartControllers = require("../controllers/cart-controllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, cartControllers.createCart);
router.put("/:cid", verifyTokenAndAuthorization, cartControllers.updateCart);
router.delete("/:cid", verifyTokenAndAuthorization, cartControllers.deleteCart);
router.get("/find/:uid", verifyTokenAndAuthorization, cartControllers.getCart);
router.get("/", verifyTokenAndAdmin, cartControllers.getAllCarts);

module.exports = router;
