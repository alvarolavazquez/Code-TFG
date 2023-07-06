const express = require("express");
const orderCtrl = require("../controllers/order.controller");
const productCtrl = require("../controllers/productURL.controller");
const authCtrl = require("../controllers/auth.controller");
const shopCtrl = require("../controllers/shop.controller");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();

router.route("/:userId").post(authCtrl.requireSignin, orderCtrl.create);

router.route("/download/:File").get(orderCtrl.getFile);

router.route("/shop/:shopId").get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop);

router.route("/user/:userId").get(authCtrl.requireSignin, orderCtrl.listByUser);

router.route("/status_values").get(orderCtrl.getStatusValues);

//Process charge for product
router.route("/:shopId/cancel/:productId").put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update);

router.route("/:orderId/charge/:userId/:shopId").put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update);

router.route("/status/:shopId").put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update);

router.route("/:orderId").get(orderCtrl.read);

router.param("userId", userCtrl.userByID);
router.param("shopId", shopCtrl.shopByID);
router.param("productId", orderCtrl.prodFind);
router.param("orderId", orderCtrl.orderByID);

module.exports = router;