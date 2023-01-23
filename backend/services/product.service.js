const Product = require("../models/product");
const { notFound } = require("../utils/apiError");
const { successResponse } = require("../utils/apiResponse");
const httpStatus = require("http-status");

/* ProductService */

createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    await Product.create(body);
    // return res.status(201).json({ data: "Product created successfully" });
    return successResponse(
      res,
      "Product created successfully",
      httpStatus.CREATED
    );
  } catch (err) {
    next(err);
  }
};

getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) throw notFound(`Product not found with id ${id}`);
    return successResponse(res, product);
  } catch (e) {
    next(e);
  }
};

getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return successResponse(res, products);
  } catch (e) {
    next(e);
  }
};

deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    return successResponse(res, null);
  } catch (e) {
    next(e);
  }
};

updateProduct = async (req, res, next) => {
  try {
    const body = req.body;
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    return successResponse(res, null);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
