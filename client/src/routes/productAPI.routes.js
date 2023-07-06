const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const productCtrl = require("../controllers/productAPI.controller");
const shopCtrl = require("../controllers/shop.controller");
const upload = require("../uploadSubscription");

const router = express.Router();

router.route("/").get(productCtrl.list);

router.route("/:productId").get(productCtrl.read);

router.route("subscribe/:productId").get(productCtrl.subscription);

router.route("/related/:productId").get(productCtrl.listRelated);

router.route("/latest/:id").get(productCtrl.listLatest);

router.route("/categories/:id").get(productCtrl.listCategories);

router.route("/photo/:productId").get(productCtrl.photo);

router
  .route("/:shopId/:productId")
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update);

router
  .route("/:shopId/:productId")
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove);

router
  .route("/by/:shopId")
  .get(productCtrl.listByShop)
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create);

router.post("/upload/:shopId", authCtrl.requireSignin, shopCtrl.isOwner,upload.single("fileProduct"),  (req, res) => {
  if (req.file === undefined) return res.status(400).json({
    message: "No se pudo cargar el archivo"
  });
  const msg = true;
  return res.send({message: req.file.filename});
});

router.param("productId", productCtrl.productByID);
router.param("shopId", shopCtrl.shopByID);

module.exports = router;
