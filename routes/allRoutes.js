const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");

// GET Request

router.get("/", userController.user_index_get);

router.get("/:id", userController.user_edit_get);

// view details
router.get("/view/:id", userController.user_view_get);

// POST Request

// search
// trim ==> remove white space
router.post("/search", userController.user_search_post);

// DELETE Request
router.delete("/:id", userController.user_delete);

// PUT Request

router.put("/:id", userController.user_put);

module.exports = router;
