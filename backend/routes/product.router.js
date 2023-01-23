const express = require("express");
const productController = require("../controllers/product.controller");
const validate = require("../middlewares/requestValidator");
const schemas = require("../validations/product");
const router = express.Router();

/* Product Routes */

// create product
router.post(
  "",
  validate(schemas.product, "body"),
  productController.addProduct
);

// get all products
router.get("", productController.getProducts);

// get a product
router.get(
  "/:id",
  validate(schemas.productId, "params"),
  productController.getProduct
);

// update a product
router.put(
  "/:id",
  validate(schemas.productId, "params"),
  validate(schemas.product, "body"),
  productController.updateProduct
);

// delete a product
router.delete(
  "/:id",
  validate(schemas.productId, "params"),
  productController.deleteProduct
);

module.exports = router;
