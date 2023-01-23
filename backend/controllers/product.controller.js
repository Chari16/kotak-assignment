const productService = require("../services/product.service");

addProduct = (req, res, next) => {
  return productService.createProduct(req, res, next);
};

getProducts = (req, res, next) => {
  return productService.getProducts(req, res, next);
};

getProduct = (req, res, next) => {
  return productService.getProduct(req, res, next);
};

updateProduct = (req, res, next) => {
  return productService.updateProduct(req, res, next);
};

deleteProduct = (req, res, next) => {
  return productService.deleteProduct(req, res, next);
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
