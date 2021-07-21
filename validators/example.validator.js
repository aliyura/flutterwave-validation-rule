const { exampleSchema } = require("./example.schema");
const validator = {
  validateFields: async (req, res) => {
    var response = await exampleSchema.validate(req.body);
    if (response.error) {
      res.status(400);
      res.json({
        message: response.error.details[0].message.replace(/\"/g, ""),
        status: "error",
        data: null,
      });
    } else {
      var fildsBase = req.body.rule.field.match(/\./g)
        ? req.body.rule.field.split(".")
        : req.body.rule.field;

      if (validator.isArray(fildsBase)) {
        var fieldValue = req.body.data;
        fildsBase.forEach((fieldItem) => {
          fieldValue = fieldValue[fieldItem];
        });

        if (fieldValue) {
          var field = req.body.rule.field;
          var condition = req.body.rule.condition;
          var conditionValue = req.body.rule.condition_value;
          var response = validator.validationCheck(
            field,
            fieldValue,
            condition,
            conditionValue
          );
          if (response.status == "success") {
            res.json(response);
          } else {
            res.status(400);
            res.json(response);
          }
        } else {
          res.status(400);
          res.json({
            message: "field " + fildsBase + " is missing from data.",
            status: "error",
            data: null,
          });
        }
      } else {
        if (req.body.data[fildsBase]) {
          var field = fildsBase;
          var fieldValue = req.body.data[fildsBase];
          var condition = req.body.rule.condition;
          var conditionValue = req.body.rule.condition_value;

          var response = validator.validationCheck(
            field,
            fieldValue,
            condition,
            conditionValue
          );
          if (response.status == "success") {
            res.json(response);
          } else {
            res.status(400);
            res.json(response);
          }
        } else {
          res.status(400);
          res.json({
            message: "field " + req.body.rule.field + " is missing from data.",
            status: "error",
            data: null,
          });
        }
      }
    }
  },
  validationCheck: (field, fieldValue, condition, conditionValue) => {
    var response = null;
    switch (condition) {
      case "eq":
        fieldValue == conditionValue
          ? (response = {
              message: "field " + field + " successfully validated.",
              status: "success",
              data: {
                validation: {
                  error: false,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            })
          : (response = {
              message: "field " + field + " failed validation.",
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            });
        break;
      case "neq":
        fieldValue != conditionValue
          ? (response = {
              message: "field " + field + " successfully validated.",
              status: "success",
              data: {
                validation: {
                  error: false,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            })
          : (response = {
              message: "field " + field + " failed validation.",
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            });
        break;
      case "gt":
        fieldValue > conditionValue
          ? (response = {
              message: "field " + field + " successfully validated.",
              status: "success",
              data: {
                validation: {
                  error: false,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            })
          : (response = {
              message: "field " + field + " failed validation.",
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            });
        break;
      case "gte":
        fieldValue >= conditionValue
          ? (response = {
              message: "field " + field + " successfully validated.",
              status: "success",
              data: {
                validation: {
                  error: false,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            })
          : (response = {
              message: "field " + field + " failed validation.",
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            });
        break;
      case "contains":
        fieldValue.contains(conditionValue)
          ? (response = {
              message: "field " + field + " successfully validated.",
              status: "success",
              data: {
                validation: {
                  error: false,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            })
          : (response = {
              message: "field " + field + " failed validation.",
              status: "error",
              data: {
                validation: {
                  error: true,
                  field: field,
                  field_value: fieldValue,
                  condition: condition,
                  condition_value: conditionValue,
                },
              },
            });
        break;
    }
    return response;
  },
  isObject: (data) => {
    return data instanceof Object && data.constructor === Object;
  },
  isArray: (data) => {
    return data instanceof Array && data.constructor === Array;
  },
};
module.exports = validator;
