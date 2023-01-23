const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/kotak", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((x) => {
    console.log(" Connected Successfully");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
