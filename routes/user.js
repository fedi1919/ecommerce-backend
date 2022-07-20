const router = require("express").Router();

const userControllers = require("../controllers/user-controllers");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.put("/:uid", verifyTokenAndAuthorization, userControllers.update);

router.delete("/:uid", verifyTokenAndAuthorization, userControllers.deleteUser);

router.get("/find/:uid", verifyTokenAndAdmin, userControllers.getUser);

router.get("/", verifyTokenAndAdmin, userControllers.getAllUser);

router.get("/stats", verifyTokenAndAdmin, userControllers.getStats);

module.exports = router;
