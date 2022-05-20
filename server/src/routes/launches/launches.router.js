const express = require("express");
const { httpGetAll, httpAddNew, httpAbort } = require("./launches.controller");

const router = express.Router();

router.get("/", httpGetAll);
router.post("/", httpAddNew);
router.delete("/:id", httpAbort);

module.exports = router;
