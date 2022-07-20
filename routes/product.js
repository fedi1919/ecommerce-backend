const router = require("express").Router();

const productControllers = require("../controllers/product-controllers");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyTokenAndAdmin, productControllers.createProduct);
router.put("/:pid", verifyTokenAndAdmin, productControllers.updateProduct);
router.delete("/:pid", verifyTokenAndAdmin, productControllers.deleteProduct);
router.get("/find/:pid", productControllers.getProduct);
router.get("/", productControllers.getAllProducts);

module.exports = router;
