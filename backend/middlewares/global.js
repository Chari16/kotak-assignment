const { Router } = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("../utils/logger");

const router = Router();

router.use(cors());
router.use(json());
router.use(urlencoded({ extended: true }));
router.use(morgan("combined", { stream: logger.stream }));

module.exports = router;
