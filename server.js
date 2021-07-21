const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const exampleRoute = require("./routes/exampleRoute");

//config
app.use(express.json());
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status);
    res.json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  } else {
    next();
  }
});

//routes
app.use("/",exampleRoute);
//listen
app.listen(port, function () {
  console.log("Rule validator service is running on port " + port);
});
