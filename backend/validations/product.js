const Joi = require("joi");

const schemas = {
  product: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
  productId: Joi.object({
    id: Joi.string().hex().length(24),
  }),
};

module.exports = schemas;
