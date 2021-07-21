const Joi = require("@hapi/joi");
module.exports = {
  exampleSchema: Joi.object({
    rule: Joi.object().required(),
    data: [
      //master fields to accept a valid object, array or string
      Joi.object().required(),
      Joi.array().items().required(),
      Joi.string().required(),
    ],
  }).required(),
};