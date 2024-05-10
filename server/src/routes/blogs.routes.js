const express = require("express");
const verifyUser = require("../middleware/users.middleware.js");
const { createBlog } = require("../controllers/blogs.controllers.js");

const blogRouter = express.Router();

blogRouter.post("/create",verifyUser,createBlog);

module.exports = blogRouter;