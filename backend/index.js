const express = require("express");
const middlewares = require("./middlewares/global");
const { errorHandler } = require("./middlewares/errorHandler");
const productsRouter = require("./routes/product.router");
const { V1 } = require("./constants");

//Database connection
require("./db");

const app = express();

app.use(middlewares);

const port = process.env.PORT || 5000;

// swagger
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

app.get("/", (req, res) => {
  res.send("Server is Up and running");
});

app.use(`/api/${V1}/products`, productsRouter);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
