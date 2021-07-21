const express = require("express");
const router = express.Router();
const { validateFields } = require("../validators/example.validator");

router.get("/", (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Rabiu Aliyu",
      github: "@aliyura",
      email: "net.rabiualiyu@gmail.com",
      mobile: "08064160204",
      twitter: "@aliyura",
    },
  });
});
router.post("/validate-rule", validateFields);
module.exports = router;
